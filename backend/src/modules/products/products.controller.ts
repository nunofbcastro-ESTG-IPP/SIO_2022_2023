import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MetricsQuantitySortDto } from '@/common/dto/metrics-quantity-sort.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('rank-sold')
  async rankSold(@Query() metricsQuantitySortDto: MetricsQuantitySortDto) {
    return this.productService.rankSold(metricsQuantitySortDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('rank-profit')
  async rankProfit(@Query() metricsQuantitySortDto: MetricsQuantitySortDto) {
    return this.productService.rankProfit(metricsQuantitySortDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('rank-group-sold')
  async rankGroupSold(@Query() metricsQuantitySortDto: MetricsQuantitySortDto) {
    return this.productService.rankGroupSold(metricsQuantitySortDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('rank-group-profit')
  async rankGroupProfit(
    @Query() metricsQuantitySortDto: MetricsQuantitySortDto,
  ) {
    return this.productService.rankGroupProfit(metricsQuantitySortDto);
  }
}
