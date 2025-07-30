import { IsIn, IsString } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  name: string;

  @IsIn(['TEMPERATURE', 'HUMIDITY'])
  type: 'TEMPERATURE' | 'HUMIDITY';
}
