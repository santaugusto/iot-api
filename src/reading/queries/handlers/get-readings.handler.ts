import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetReadingsQuery } from '../get-readings.query';
import { Reading } from 'src/reading/entities/entitie-reading';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetReadingsQuery)
export class GetReadingsHandler implements IQueryHandler<GetReadingsQuery> {
  constructor(
    @InjectRepository(Reading)
    private readonly repo: Repository<Reading>,
  ) {}

  async execute(query: GetReadingsQuery): Promise<Reading[]> {
    const { sensorId, type, startDate, endDate } = query.filters;

    const qb = this.repo
      .createQueryBuilder('reading')
      .leftJoinAndSelect('reading.sensor', 'sensor')
      .orderBy('reading.timestamp', 'DESC');

    if (sensorId) {
      qb.andWhere('sensor.id = :sensorId', { sensorId });
    }

    if (type) {
      qb.andWhere('sensor.type = :type', { type });
    }

    if (startDate) {
      qb.andWhere('reading.timestamp >= :startDate', { startDate });
    }

    if (endDate) {
      qb.andWhere('reading.timestamp <= :endDate', { endDate });
    }

    return qb.getMany();
  }
}
