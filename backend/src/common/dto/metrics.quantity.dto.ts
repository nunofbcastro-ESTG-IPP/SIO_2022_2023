import { IsInt, IsOptional } from 'class-validator';
import { MetricsDto } from './metrics.dto';
import { Type } from 'class-transformer';

export class MetricsQuantityDto extends MetricsDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  quantity = 5;
}
