export interface SensorDataDto {
  sensorId: string;
  type?: 'temperature' | 'humidity';
  value: number;
  timestamp: string;
  location: string;
}
