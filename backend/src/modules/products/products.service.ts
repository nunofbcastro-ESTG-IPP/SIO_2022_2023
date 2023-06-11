import { MetricsQuantitySortDto } from '@/common/dto/metrics-quantity-sort.dto';
import { SortOption } from '@/common/enums/SortOption';
import { BETWEENFormatter } from '@/common/utils/date-formatter';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async rankSold(metricsQuantitySortDto: MetricsQuantitySortDto) {
    const initDate = metricsQuantitySortDto.initDate.toString();
    const finalDate = metricsQuantitySortDto.finalDate.toString();
    const order = SortOption.getSortOrder(metricsQuantitySortDto.sort);

    return await this.prisma.$queryRawUnsafe(
      `
        SELECT TOP ${metricsQuantitySortDto.quantity} P.*, I.sold 
        FROM [dbo].[Product] AS P
        JOIN (
          SELECT IL.productCode, sum(IL.quantity) AS sold 
          FROM InvoiceLine AS IL
          JOIN Invoice AS I ON ${BETWEENFormatter(
            'I.invoiceDate',
            initDate,
            finalDate,
          )} and I.id = IL.invoiceId
          GROUP BY IL.productCode
        ) AS I ON I.productCode = P.productCode
        ORDER BY sold ${order}
      `,
    );
  }

  async rankProfit(metricsQuantitySortDto: MetricsQuantitySortDto) {
    const initDate = metricsQuantitySortDto.initDate.toString();
    const finalDate = metricsQuantitySortDto.finalDate.toString();
    const order = SortOption.getSortOrder(metricsQuantitySortDto.sort);

    return await this.prisma.$queryRawUnsafe(
      `
        SELECT TOP ${metricsQuantitySortDto.quantity} P.*, I.profit 
        FROM [dbo].[Product] AS P
        JOIN (
          SELECT IL.productCode, sum(IL.quantity * IL.unitPrice) AS profit 
          FROM InvoiceLine AS IL
          JOIN Invoice AS I ON ${BETWEENFormatter(
            'I.invoiceDate',
            initDate,
            finalDate,
          )} AND I.id = IL.invoiceId
          GROUP BY IL.productCode
        ) AS I ON I.productCode = P.productCode
        ORDER BY profit ${order}
      `,
    );
  }

  async rankGroupSold(metricsQuantitySortDto: MetricsQuantitySortDto) {
    const initDate = metricsQuantitySortDto.initDate.toString();
    const finalDate = metricsQuantitySortDto.finalDate.toString();
    const order = SortOption.getSortOrder(metricsQuantitySortDto.sort);

    return await this.prisma.$queryRawUnsafe(
      `
        SELECT TOP ${
          metricsQuantitySortDto.quantity
        } MIN(F.name) AS productGroup, sum(I.sold) as sold
        FROM [dbo].[Product] AS P
        JOIN (
          SELECT IL.productCode, sum(IL.quantity) AS sold 
          FROM InvoiceLine AS IL
          JOIN Invoice AS I ON ${BETWEENFormatter(
            'I.invoiceDate',
            initDate,
            finalDate,
          )} and I.id = IL.invoiceId
          GROUP BY IL.productCode
        ) AS I ON I.productCode = P.productCode
        JOIN [dbo].[Family] AS F ON F.id = P.productGroup
        GROUP BY P.productGroup
        ORDER BY sold ${order}
      `,
    );
  }

  async rankGroupProfit(metricsQuantitySortDto: MetricsQuantitySortDto) {
    const initDate = metricsQuantitySortDto.initDate.toString();
    const finalDate = metricsQuantitySortDto.finalDate.toString();
    const order = SortOption.getSortOrder(metricsQuantitySortDto.sort);

    return await this.prisma.$queryRawUnsafe(
      `
        SELECT TOP ${
          metricsQuantitySortDto.quantity
        } MIN(F.name) AS productGroup, sum(I.profit) as profit
        FROM [dbo].[Product] AS P
        JOIN (
            SELECT IL.productCode, sum(IL.quantity * IL.unitPrice) AS profit 
            FROM InvoiceLine AS IL
            JOIN Invoice AS I ON ${BETWEENFormatter(
              'I.invoiceDate',
              initDate,
              finalDate,
            )} and I.id = IL.invoiceId
            GROUP BY IL.productCode
        ) AS I ON I.productCode = P.productCode
        JOIN [dbo].[Family] AS F ON F.id = P.productGroup
        GROUP BY P.productGroup
        ORDER BY profit ${order}
      `,
    );
  }
}
