import { IsISO8601, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateReadingDto {
  @ApiProperty({
    example: 'uuid-do-sensor',
    description: 'ID do sensor vinculado',
  })
  @IsUUID()
  sensorId: string;

  @ApiProperty({
    example: 25.3,
    description: 'Valor da leitura (temperatura ou umidade)',
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    example: '2025-07-30T10:15:00.000Z',
    description: 'Data/hora da leitura',
  })
  @IsISO8601()
  timestamp: string;
}
