import { IsOptional, IsUUID, IsEnum, IsISO8601 } from 'class-validator';

export class GetReadingsDto {
  @IsOptional()
  @IsUUID()
  sensorId?: string;

  @IsOptional()
  @IsEnum(['TEMPERATURE', 'HUMIDITY'])
  type?: 'TEMPERATURE' | 'HUMIDITY';

  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @IsOptional()
  @IsISO8601()
  endDate?: string;
}
