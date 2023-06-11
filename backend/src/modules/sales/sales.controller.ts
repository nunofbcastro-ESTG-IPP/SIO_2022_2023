import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { MetricsDto } from '@/common/dto/metrics.dto';
import { MetricsQuantityDto } from '@/common/dto/metrics.quantity.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @HttpCode(HttpStatus.OK)
  @Get('number-sales')
  async numberSales(@Query() metricsDto: MetricsDto) {
    return this.salesService.numberSales(metricsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('gross-sales')
  async grossSales(@Query() metricsDto: MetricsDto) {
    return this.salesService.grossSales(metricsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('cost-and-sales')
  async costsAndSales(@Query() metricsDto: MetricsDto) {
    return this.salesService.costsAndSales(metricsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('last-sales')
  async lastSales(@Query() metricsQuantityDto: MetricsQuantityDto) {
    return this.salesService.lastSales(metricsQuantityDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('metrics')
  async metrics(@Query() metricsDto: MetricsDto) {
    return this.salesService.metrics(metricsDto);
  }
}
