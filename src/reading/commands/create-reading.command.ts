export class CreateReadingCommand {
  constructor(
    public readonly sensorId: string,
    public readonly value: number,
    public readonly timestamp: Date,
  ) {}
}
