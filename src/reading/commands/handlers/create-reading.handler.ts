import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReadingCommand } from '../create-reading.command';
import { Reading } from 'src/reading/entities/entitie-reading';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorElasticService } from 'src/elasticsearch/elasticsearch.service';
import { Sensor } from 'src/sensor/entities/entitie-sensor';

@CommandHandler(CreateReadingCommand)
export class CreateReadingHandler
  implements ICommandHandler<CreateReadingCommand>
{
  constructor(
    @InjectRepository(Reading)
    private readonly repo: Repository<Reading>,
    private readonly sensorElasticService: SensorElasticService,
  ) {}

  async execute(command: CreateReadingCommand): Promise<void> {
    const reading = this.repo.create({
      sensor: { id: command.sensorId },
      value: command.value,
      timestamp: command.timestamp,
    });
    const saved = await this.repo.save(reading);
    const sensor = await this.repo.manager.findOne(Sensor, {
      where: { id: command.sensorId },
    });

    await this.sensorElasticService.indexSensorData({
      sensorId: saved.sensor.id,
      value: saved.value,
      timestamp: saved.timestamp.toISOString(),
      location: sensor?.location ?? 'UNKNOWN',
    });
  }
}
