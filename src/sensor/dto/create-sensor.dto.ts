import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class CreateSensorDto {
  @ApiProperty({ example: 'Sensor Sala 01' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Sala 01' })
  @IsString()
  location: string;

  @ApiProperty({ example: 'TEMPERATURE', enum: ['TEMPERATURE', 'HUMIDITY'] })
  @IsIn(['TEMPERATURE', 'HUMIDITY'])
  type: 'TEMPERATURE' | 'HUMIDITY';
}
