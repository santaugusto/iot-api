export interface ReadingFilters {
  sensorId?: string;
  type?: 'TEMPERATURE' | 'HUMIDITY';
  startDate?: Date;
  endDate?: Date;
}
