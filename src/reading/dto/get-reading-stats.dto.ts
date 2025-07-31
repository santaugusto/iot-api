import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class GetReadingStatsDto {
  @IsUUID()
  @ApiPropertyOptional({ description: 'id sensor' })
  sensorId: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ description: 'Data inicial (formato ISO)' })
  start?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ description: 'Data final (formato ISO)' })
  end?: string;
}
