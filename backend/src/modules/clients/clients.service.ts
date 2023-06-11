import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { MetricsDto } from '@/common/dto/metrics.dto';
import { MetricsQuantitySortDto } from '@/common/dto/metrics-quantity-sort.dto';
import { SortOption } from '@/common/enums/SortOption';
import {
  BETWEENFormatter,
  BETWEENMonthFormatter,
  finalDateFormatter,
  initDateFormatter,
  monthFormatter,
} from '@/common/utils/date-formatter';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async rankClients(metricsQuantitySortDto: MetricsQuantitySortDto) {
    const initDate = metricsQuantitySortDto.initDate.toString();
    const finalDate = metricsQuantitySortDto.finalDate.toString();
    const order = SortOption.getSortOrder(metricsQuantitySortDto.sort);

    return await this.prisma.$queryRawUnsafe(
      `
        SELECT TOP ${metricsQuantitySortDto.quantity} C.*, amountSpent
        FROM [dbo].[Customer] AS C
        JOIN (
            SELECT I.customerId, sum(IL.quantity * IL.unitPrice) AS  amountSpent
            FROM InvoiceLine AS IL
            JOIN Invoice AS I ON ${BETWEENFormatter(
              'I.invoiceDate',
              initDate,
              finalDate,
            )} AND I.id = IL.invoiceId
            GROUP BY I.customerId
        ) AS I ON C.id = I.customerId
        ORDER BY amountSpent ${order}
      `,
    );
  }

  async activeClients(metricsDto: MetricsDto): Promise<Customer[]> {
    const initDate = metricsDto.initDate.toString();
    const finalDate = metricsDto.finalDate.toString();

    return await this.prisma.$queryRawUnsafe(
      `
        SELECT *
        FROM [dbo].[Customer]
        WHERE ${BETWEENMonthFormatter('createdAt', initDate, finalDate, 3)}
      `,
    );
  }

  async numberNewClients(metricsDto: MetricsDto): Promise<number> {
    const initDate = metricsDto.initDate.toString();
    const finalDate = metricsDto.finalDate.toString();

    const result = await this.prisma.$queryRawUnsafe(
      `
        SELECT COUNT(C.id) as quantity
        FROM Customer AS C
        WHERE ${BETWEENFormatter('createdAt', initDate, finalDate)}
      `,
    );

    return result[0].quantity;
  }

  async newClientsHistory(metricsDto: MetricsDto) {
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

        SELECT Month.MonthYear AS MonthYear,  COALESCE(Customer.quantity, 0) AS quantity
        FROM (
          SELECT FORMAT(Data, 'MM/yyyy') AS MonthYear
          FROM Month
        ) AS Month
        LEFT OUTER JOIN (
          SELECT COUNT(C.id) as quantity, ${monthFormatter(
            'C.createdAt',
          )} AS Month
          FROM Customer AS C
          WHERE ${BETWEENFormatter('C.createdAt', initDate, finalDate)}
          GROUP BY MONTH(C.createdAt), YEAR(C.createdAt)
        ) AS Customer ON Customer.Month = Month.MonthYear

        option (maxrecursion 0)
      `,
    );

    return result;
  }
}
