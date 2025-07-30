import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetReadingsDto } from '../dto/get-readings.dto';
import { GetReadingsQuery } from '../queries/get-readings.query';
import { Reading } from '../entities/entitie-reading';
import { CreateReadingCommand } from '../commands/create-reading.command';
import { CreateReadingDto } from '../dto/create-reading.dto';

@Controller('readings')
export class ReadingController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getReadings(@Query() query: GetReadingsDto): Promise<Reading> {
    return this.queryBus.execute(
      new GetReadingsQuery({
        ...query,
        startDate: query.startDate ? new Date(query.startDate) : undefined,
        endDate: query.endDate ? new Date(query.endDate) : undefined,
      }),
    );
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createReading(
    @Body() body: CreateReadingDto,
  ): Promise<{ message: string }> {
    await this.commandBus.execute(
      new CreateReadingCommand(
        body.sensorId,
        body.value,
        new Date(body.timestamp),
      ),
    );
    return { message: 'Leitura registrada com sucesso' };
  }
}
