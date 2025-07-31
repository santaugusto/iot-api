import { FilterReadingDto } from '../dto/filter-reading.dto';

export class GetAllReadingsQuery {
  constructor(public readonly filters: FilterReadingDto) {}
}
