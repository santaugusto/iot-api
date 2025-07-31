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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterReadingDto } from '../dto/filter-reading.dto';
import { GetAllReadingsQuery } from '../queries/get-all-readings.query';
import { GetReadingStatsDto } from '../dto/get-reading-stats.dto';
import { GetReadingStatsQuery } from '../queries/get-reading-stats.query';
@ApiTags('readings')
@Controller('readings')
export class ReadingController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar leituras',
    description:
      'Retorna todas as leituras registradas, podendo incluir temperatura ou umidade conforme o tipo do sensor',
  })
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
  @ApiOperation({
    summary: 'Criar leitura de sensor',
    description:
      'Cria uma nova leitura associada a um sensor, contendo o valor numérico e um timestamp no formato ISO 8601',
  })
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

  @Get('filter')
  @ApiOperation({ summary: 'Listar todas as leituras com filtros opcionais' })
  async getAll(
    @Query(new ValidationPipe({ transform: true })) filters: FilterReadingDto,
  ): Promise<Reading[]> {
    return this.queryBus.execute(new GetAllReadingsQuery(filters));
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Obter estatísticas por sensor',
    description:
      'Retorna a média, mínimo e máximo dos valores registrados por um sensor, com filtro opcional por intervalo de tempo',
  })
  async getStats(
    @Query(new ValidationPipe({ transform: true }))
    query: GetReadingStatsDto,
  ): Promise<any> {
    return this.queryBus.execute(new GetReadingStatsQuery(query));
  }
}
