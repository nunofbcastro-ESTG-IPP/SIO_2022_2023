import { MetricsDto } from '@/common/dto/metrics.dto';
import { MetricsQuantityDto } from '@/common/dto/metrics.quantity.dto';
import {
  BETWEENFormatter,
  BETWEENMonthFormatter,
  finalDateFormatter,
  initDateFormatter,
  monthFormatter,
} from '@/common/utils/date-formatter';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async grossSales(metricsDto: MetricsDto): Promise<number> {
    const initDate = metricsDto.initDate.toString();
    const finalDate = metricsDto.finalDate.toString();

    const result = await this.prisma.$queryRawUnsafe(
      `
        SELECT sum(IL.quantity * IL.unitPrice) AS profit
        FROM (
            SELECT * 
            FROM Invoice 
            WHERE ${BETWEENFormatter('invoiceDate', initDate, finalDate)}
        ) as I 
        JOIN InvoiceLine AS IL ON I.id = IL.invoiceId
      `,
    );

    return Number(result[0].profit);
  }

  async numberSales(metricsDto: MetricsDto): Promise<number> {
    const initDate = metricsDto.initDate.toString();
    const finalDate = metricsDto.finalDate.toString();

    const result = await this.prisma.$queryRawUnsafe(
      `
        SELECT count(I.id) AS quantity
        FROM Invoice as I 
        WHERE ${BETWEENFormatter('I.invoiceDate', initDate, finalDate)}
      `,
    );

    return result[0].quantity;
  }

  async costsAndSales(metricsDto: MetricsDto) {
    const initDate = metricsDto.initDate.toString();
    const finalDate = metricsDto.finalDate.toString();

    const result = await this.prisma.$queryRawUnsafe(
      `
        WITH Month AS (
          SELECT DATEFROMPARTS(YEAR(${initDateFormatter(
            initDate,
          )}), MONTH(${initDateFormatter(initDate)}), 1) AS Data
          UNION ALL
          SELECT DATEADD(MONTH, 1, Data)
          FROM Month
          WHERE DATEADD(MONTH, 1, Data) <= ${finalDateFormatter(finalDate)}
        )

        SELECT COALESCE(Costs, 0) AS Costs, COALESCE(Sales, 0) AS Sales, COALESCE(Costs, 0) - COALESCE(Sales, 0) AS Gross, COALESCE(NewCustomer.quantity, 0) AS NewClients, COALESCE(ActiveCustomer.quantity, 0) AS ActiveCustomer, MONTH.MonthYear AS MonthYear
        FROM (
          SELECT FORMAT(Data, 'MM/yyyy') AS MonthYear
          FROM Month
        ) AS Month
        LEFT OUTER JOIN (
          SELECT SUM(grossTotal) AS Costs, ${monthFormatter('date')} AS Month
          FROM [dbo].[Purchase]
          WHERE isDeleted = 0 AND isPaid = 1 AND ${BETWEENFormatter(
            'date',
            initDate,
            finalDate,
          )}
          GROUP BY MONTH(date), YEAR(date)
        ) AS Costs ON Month.MonthYear = Costs.Month
        LEFT OUTER JOIN (
          SELECT SUM(grossTotal) AS Sales, ${monthFormatter(
            'invoiceDate',
          )} AS Month
          FROM [dbo].[Invoice]
          WHERE ${BETWEENFormatter('invoiceDate', initDate, finalDate)}
          GROUP BY MONTH(invoiceDate), YEAR(invoiceDate)
        ) AS Sales ON Month.MonthYear = Sales.Month
        LEFT OUTER JOIN (
          SELECT COUNT(C.id) as quantity, ${monthFormatter(
            'createdAt',
          )} AS Month
          FROM Customer AS C
          WHERE ${BETWEENFormatter('createdAt', initDate, finalDate)}
          GROUP BY MONTH(createdAt), YEAR(createdAt)
        ) AS NewCustomer ON Month.MonthYear = NewCustomer.Month
        LEFT OUTER JOIN (
          SELECT COUNT(C.id) as quantity, ${monthFormatter(
            'createdAt',
          )} AS Month
          FROM [dbo].[Customer]  AS C
          WHERE ${BETWEENMonthFormatter('createdAt', initDate, finalDate, 3)}
          GROUP BY MONTH(createdAt), YEAR(createdAt)
        ) AS ActiveCustomer ON Month.MonthYear = ActiveCustomer.Month
        ORDER BY Month.MonthYear

        option (maxrecursion 0)
      `,
    );

    return result;
  }

  async lastSales(metricsQuantityDto: MetricsQuantityDto) {
    const initDate = metricsQuantityDto.initDate.toString();
    const finalDate = metricsQuantityDto.finalDate.toString();

    const result = await this.prisma.$queryRawUnsafe(
      `
        SELECT TOP ${
          metricsQuantityDto.quantity
        } I.*, C.companyName as CustomerName
        FROM (
          SELECT TOP ${metricsQuantityDto.quantity} *
          FROM Invoice 
          WHERE ${BETWEENFormatter('invoiceDate', initDate, finalDate)}
          ORDER BY invoiceDate DESC
        ) AS I
        JOIN Customer AS C ON C.id = I.customerId
        ORDER BY invoiceDate DESC
      `,
    );

    if (Array.isArray(result)) {
      for (const invoice of result) {
        invoice.invoiceLines = [];
        invoice.invoiceLines = await this.prisma.$queryRawUnsafe(
          `
            SELECT *
            FROM [dbo].[InvoiceLine]
            WHERE invoiceId = '${invoice.id}'
          `,
        );
      }
    }

    return result;
  }

  async numberNewClients(metricsDto: MetricsDto): Promise<number> {
    const initDate = metricsDto.initDate.toString();
    const finalDate = metricsDto.finalDate.toString();

    const result = await this.prisma.$queryRawUnsafe(
      `
        SELECT COUNT(C.id) as quantity
        FROM Customer AS C
        WHERE ${BETWEENMonthFormatter('createdAt', initDate, finalDate, 3)}
      `,
    );

    return Number(result[0].quantity);
  }

  async numberActiveClients(metricsDto: MetricsDto): Promise<number> {
    const initDate = metricsDto.initDate.toString();
    const finalDate = metricsDto.finalDate.toString();

    const result = await this.prisma.$queryRawUnsafe(
      `
        SELECT COUNT(C.id) as quantity
        FROM [dbo].[Customer]  AS C
        WHERE ${BETWEENMonthFormatter('createdAt', initDate, finalDate, 3)}
      `,
    );

    return Number(result[0].quantity);
  }

  async numberTotalCustomer(metricsDto: MetricsDto): Promise<number> {
    const finalDate = metricsDto.finalDate.toString();

    const result = await this.prisma.$queryRawUnsafe(
      `
        SELECT COUNT(C.id) as quantity
        FROM [dbo].[Customer]  AS C
        WHERE C.createdAt <= ${finalDateFormatter(finalDate)}
      `,
    );

    return Number(result[0].quantity);
  }

  async costGoods(metricsDto: MetricsDto) {
    const initDate = metricsDto.initDate.toString();
    const finalDate = metricsDto.finalDate.toString();

    const result = await this.prisma.$queryRawUnsafe(
      `
        SELECT SUM(grossTotal) as costs
        FROM [dbo].[Purchase]
        WHERE isDeleted = 0 AND isPaid = 1 AND 
        ${BETWEENFormatter('date', initDate, finalDate)}
      `,
    );

    return Number(result[0].costs);
  }

  async metrics(metricsDto: MetricsDto) {
    const sales = await this.grossSales(metricsDto);
    const costOfGoods = await this.costGoods(metricsDto);

    return {
      Sales: sales,
      'Cost of Goods': costOfGoods,
      'Gross Income': Number((sales - costOfGoods).toFixed(2)),
      'Active customer': await this.numberActiveClients(metricsDto),
      'New customer': await this.numberNewClients(metricsDto),
      'Total customer': await this.numberTotalCustomer(metricsDto),
    };
  }
}
