import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { MetricsDto } from './metrics.dto';
import { SortOption } from '../enums/SortOption';
import { Type } from 'class-transformer';

export class MetricsQuantitySortDto extends MetricsDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  quantity = 5;

  @IsOptional()
  @IsEnum(SortOption, {
    message: 'sort must be one of the following values: most, least',
  })
  sort: SortOption = SortOption.Most;
}
