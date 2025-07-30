import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSensorDto } from '../dto/create-sensor.dto';
import { CreateSensorCommand } from '../commands/create-sensor.command';
import { GetAllSensorsQuery } from '../queries/get-all-sensors.query';
import { Sensor } from '../entities/entitie-sensor';

@Controller('sensors')
export class SensorController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateSensorDto): Promise<Sensor> {
    return this.commandBus.execute(new CreateSensorCommand(dto.name, dto.type));
  }

  @Get()
  async findAll(): Promise<Sensor> {
    return this.queryBus.execute(new GetAllSensorsQuery());
  }
}
