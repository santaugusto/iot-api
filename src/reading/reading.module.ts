import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { Reading } from './entities/entitie-reading';
import { ReadingController } from './controllers/reading.controller';

import { CreateReadingHandler } from './commands/handlers/create-reading.handler';
import { GetReadingsHandler } from './queries/handlers/get-readings.handler';
import { GetAllReadingsHandler } from './queries/handlers/get-all-readings.handler';
import { GetReadingStatsHandler } from './queries/handlers/get-reading-stats.query';
import { SensorElasticService } from 'src/elasticsearch/elasticsearch.service';
import { ElasticsearchModule } from 'src/elasticsearch/elasticsearch.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reading]),
    CqrsModule,
    ElasticsearchModule,
  ],
  controllers: [ReadingController],
  providers: [
    CreateReadingHandler,
    GetReadingsHandler,
    GetAllReadingsHandler,
    GetReadingStatsHandler,
    SensorElasticService,
  ],
})
export class ReadingModule {}
