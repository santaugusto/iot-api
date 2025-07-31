import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllReadingsQuery } from '../get-all-readings.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Reading } from 'src/reading/entities/entitie-reading';
import { Repository } from 'typeorm';

@QueryHandler(GetAllReadingsQuery)
export class GetAllReadingsHandler
  implements IQueryHandler<GetAllReadingsQuery>
{
  constructor(
    @InjectRepository(Reading)
    private readonly repo: Repository<Reading>,
  ) {}

  async execute(query: GetAllReadingsQuery): Promise<Reading[]> {
    const { sensorId, type, dataInicial, dataFinal } = query.filters;
    const qb = this.repo
      .createQueryBuilder('reading')
      .leftJoinAndSelect('reading.sensor', 'sensor');

    if (sensorId) qb.andWhere('sensor.id = :sensorId', { sensorId });
    if (type) qb.andWhere('sensor.type = :type', { type });
    if (dataInicial)
      qb.andWhere('reading.timestamp >= :dataInicial', {
        dataInicial: new Date(dataInicial),
      });

    if (dataFinal)
      qb.andWhere('reading.timestamp <= :dataFinal', {
        dataFinal: new Date(dataFinal),
      });
    return qb.getMany();
  }
}
