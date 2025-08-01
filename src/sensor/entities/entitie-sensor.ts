import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reading } from 'src/reading/entities/entitie-reading';

export enum SensorTypeEnum {
  TEMPERATURE = 'TEMPERATURE',
  HUMIDITY = 'HUMIDITY',
}

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: SensorTypeEnum,
  })
  type: SensorTypeEnum;

  @Column({ default: 'UNKNOWN' })
  location: string;

  @OneToMany(() => Reading, (reading) => reading.sensor)
  readings: Reading[];
}
