import { IsEnum, IsOptional } from 'class-validator';
import { MetricsDto } from './metrics.dto';
import { SortOption } from '../enums/SortOption';

export class MetricsSortDto extends MetricsDto {
  @IsOptional()
  @IsEnum(SortOption, {
    message: 'sort must be one of the following values: most, least',
  })
  sort: SortOption = SortOption.Most;
}
