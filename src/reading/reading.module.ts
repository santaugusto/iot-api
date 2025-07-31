import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { Reading } from './entities/entitie-reading';
import { ReadingController } from './controllers/reading.controller';

import { CreateReadingHandler } from './commands/handlers/create-reading.handler';
import { GetReadingsHandler } from './queries/handlers/get-readings.handler';
import { GetAllReadingsHandler } from './queries/handlers/get-all-readings.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Reading]), CqrsModule],
  controllers: [ReadingController],
  providers: [CreateReadingHandler, GetReadingsHandler, GetAllReadingsHandler],
})
export class ReadingModule {}
