export class CreateSensorCommand {
  constructor(
    public readonly name: string,
    public readonly type: 'TEMPERATURE' | 'HUMIDITY',
    public readonly location: string,
  ) {}
}
