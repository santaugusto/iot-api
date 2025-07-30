import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './entities/entitie-sensor';
import { SensorController } from './controllers/sensor.controller';
import { CreateSensorHandler } from './commands/handlers/create-sensor.handler';
import { GetAllSensorsHandler } from './queries/handlers/get-all-sensors.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor]), CqrsModule],
  controllers: [SensorController],
  providers: [CreateSensorHandler, GetAllSensorsHandler],
  exports: [TypeOrmModule],
})
export class SensorModule {}
