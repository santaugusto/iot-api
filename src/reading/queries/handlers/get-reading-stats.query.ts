import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetReadingStatsQuery } from '../get-reading-stats.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Reading } from 'src/reading/entities/entitie-reading';
import { Repository } from 'typeorm';

type ReadingStatsResult = {
  average: string | null;
  min: string | null;
  max: string | null;
};

@QueryHandler(GetReadingStatsQuery)
export class GetReadingStatsHandler
  implements IQueryHandler<GetReadingStatsQuery>
{
  constructor(
    @InjectRepository(Reading)
    private readonly repo: Repository<Reading>,
  ) {}

  async execute(query: GetReadingStatsQuery): Promise<{
    sensorId: string;
    average: number | null;
    min: number | null;
    max: number | null;
  }> {
    const { sensorId, start, end } = query.filters;

    const qb = this.repo
      .createQueryBuilder('reading')
      .select('AVG(reading.value)', 'average')
      .addSelect('MIN(reading.value)', 'min')
      .addSelect('MAX(reading.value)', 'max')
      .where('reading.sensorId = :sensorId', { sensorId });

    if (start) {
      qb.andWhere('reading.timestamp >= :start', {
        start: new Date(start),
      });
    }

    if (end) {
      qb.andWhere('reading.timestamp <= :end', {
        end: new Date(end),
      });
    }

    const result = await qb.getRawOne<ReadingStatsResult>();

    if (!result) {
      return {
        sensorId,
        average: null,
        min: null,
        max: null,
      };
    }

    return {
      sensorId,
      average: result.average ? parseFloat(result.average) : null,
      min: result.min ? parseFloat(result.min) : null,
      max: result.max ? parseFloat(result.max) : null,
    };
  }
}
