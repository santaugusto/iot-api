import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReadingCommand } from '../create-reading.command';
import { Reading } from 'src/reading/entities/entitie-reading';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(CreateReadingCommand)
export class CreateReadingHandler
  implements ICommandHandler<CreateReadingCommand>
{
  constructor(
    @InjectRepository(Reading)
    private readonly repo: Repository<Reading>,
  ) {}

  async execute(command: CreateReadingCommand): Promise<void> {
    const reading = this.repo.create({
      sensor: { id: command.sensorId },
      value: command.value,
      timestamp: command.timestamp,
    });

    await this.repo.save(reading);
  }
}
