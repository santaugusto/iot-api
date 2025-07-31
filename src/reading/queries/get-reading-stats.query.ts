// src/reading/queries/get-reading-stats.query.ts
import { GetReadingStatsDto } from '../dto/get-reading-stats.dto';

export class GetReadingStatsQuery {
  constructor(public readonly filters: GetReadingStatsDto) {}
}
