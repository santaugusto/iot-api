import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSensorDto } from '../dto/create-sensor.dto';
import { CreateSensorCommand } from '../commands/create-sensor.command';
import { GetAllSensorsQuery } from '../queries/get-all-sensors.query';
import { Sensor } from '../entities/entitie-sensor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('sensors')
@Controller('sensors')
export class SensorController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo sensor',
    description: 'Cria um novo sensor do tipo TEMPERATURE ou HUMIDITY',
  })
  async create(@Body() dto: CreateSensorDto): Promise<Sensor> {
    return this.commandBus.execute(new CreateSensorCommand(dto.name, dto.type));
  }

  @Get()
  @ApiOperation({
    summary: 'Listar sensores',
    description: 'Retorna todos os sensores cadastrados no sistema',
  })
  async findAll(): Promise<Sensor> {
    return this.queryBus.execute(new GetAllSensorsQuery());
  }
}
