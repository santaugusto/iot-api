import { IsISO8601, IsUUID, IsNumber } from 'class-validator';

export class CreateReadingDto {
  @IsUUID()
  sensorId: string;

  @IsNumber()
  value: number;

  @IsISO8601()
  timestamp: string;
}
