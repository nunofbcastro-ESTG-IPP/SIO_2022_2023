import { IsNotEmpty, IsDateString } from 'class-validator';

export class MetricsDto {
  @IsNotEmpty()
  @IsDateString()
  initDate: Date;

  @IsNotEmpty()
  @IsDateString()
  finalDate: Date;
}
