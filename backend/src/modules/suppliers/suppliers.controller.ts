import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { MetricsQuantitySortDto } from '@/common/dto/metrics-quantity-sort.dto';
import { MetricsDto } from '@/common/dto/metrics.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('rank-suppliers')
  async rankSuppliers(@Query() metricsQuantitySortDto: MetricsQuantitySortDto) {
    return this.suppliersService.rankSuppliers(metricsQuantitySortDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('metrics')
  async metrics(@Query() metricsDto: MetricsDto) {
    return this.suppliersService.metrics(metricsDto);
  }
}
