import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSensorCommand } from '../create-sensor.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from 'src/sensor/entities/entitie-sensor';

@CommandHandler(CreateSensorCommand)
export class CreateSensorHandler
  implements ICommandHandler<CreateSensorCommand>
{
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
  ) {}

  async execute(command: CreateSensorCommand): Promise<Sensor> {
    const sensor = this.sensorRepository.create({
      name: command.name,
      type: command.type,
    });
    return this.sensorRepository.save(sensor);
  }
}
