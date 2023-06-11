import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { MetricsQuantitySortDto } from '@/common/dto/metrics-quantity-sort.dto';
import { SortOption } from '@/common/enums/SortOption';
import { BETWEENFormatter } from '@/common/utils/date-formatter';
import { MetricsDto } from '@/common/dto/metrics.dto';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async rankSuppliers(metricsQuantitySortDto: MetricsQuantitySortDto) {
    const initDate = metricsQuantitySortDto.initDate.toString();
    const finalDate = metricsQuantitySortDto.finalDate.toString();
    const order = SortOption.getSortOrder(metricsQuantitySortDto.sort);

    return await this.prisma.$queryRawUnsafe(
      `
        SELECT TOP ${metricsQuantitySortDto.quantity} S.*, quant
        FROM [dbo].[Supplier] AS S
        JOIN (
          SELECT P.supplierId, sum(PL.quantity) as quant
          FROM (
            SELECT *
            FROM [dbo].[Purchase]
            WHERE documentType='FC' AND isDeleted=0 AND isPaid=1 AND ${BETWEENFormatter(
              'date',
              initDate,
              finalDate,
            )}
          ) AS P
          JOIN [dbo].[PurchaseLine] as PL on P.id = PL.purchaseId
          GROUP BY P.supplierId
        ) AS I ON S.id = I.supplierId
        ORDER BY quant ${order}
      `,
    );
  }

  async metrics(metricsDto: MetricsDto) {
    const initDate = metricsDto.initDate.toString();
    const finalDate = metricsDto.finalDate.toString();

    const result = await this.prisma.$queryRawUnsafe(
      `
      SELECT S.*, COALESCE(P.costs, 0)+COALESCE(D.costs, 0) as costsTotal, COALESCE(P.costs, 0) as payed, COALESCE(D.costs, 0) as debts
      FROM Supplier AS S
      LEFT JOIN(
        SELECT supplierId, SUM(grossTotal) AS costs
        FROM Purchase
        WHERE isPaid = 1 and isDeleted = 0 and ${BETWEENFormatter(
          'date',
          initDate,
          finalDate,
        )}
        GROUP BY supplierId
      ) AS P ON P.supplierId = S.id
      LEFT JOIN(
        SELECT supplierId, SUM(grossTotal) AS costs
        FROM Purchase
        WHERE isPaid = 0 and isDeleted = 0 and ${BETWEENFormatter(
          'date',
          initDate,
          finalDate,
        )}
        GROUP BY supplierId
      ) AS D ON D.supplierId = S.id
      WHERE P.costs > 0 OR D.costs > 0
      `,
    );

    return result;
  }
}
