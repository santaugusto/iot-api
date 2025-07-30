import { ReadingFilters } from './types/reading-filters.interface';

export class GetReadingsQuery {
  constructor(public readonly filters: ReadingFilters) {}
}
