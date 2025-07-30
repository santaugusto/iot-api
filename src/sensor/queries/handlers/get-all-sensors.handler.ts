import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSensorsQuery } from '../get-all-sensors.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from 'src/sensor/entities/entitie-sensor';

@QueryHandler(GetAllSensorsQuery)
export class GetAllSensorsHandler implements IQueryHandler<GetAllSensorsQuery> {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
  ) {}

  async execute(): Promise<Sensor[]> {
    return this.sensorRepository.find();
  }
}
