import { IsOptional, IsUUID, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterReadingDto {
  @ApiPropertyOptional({ description: 'ID do sensor', format: 'uuid' })
  @IsOptional()
  @IsUUID()
  sensorId?: string;

  @ApiPropertyOptional({ description: 'Tipo do sensor (ex: temperatura)' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    description: 'Data inicial (ISO 8601)',
    example: '2024-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  dataInicial?: Date;

  @ApiPropertyOptional({
    description: 'Data final (ISO 8601)',
    example: '2024-01-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  dataFinal?: Date;
}
