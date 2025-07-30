import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reading } from 'src/reading/entities/entitie-reading';

export type SensorType = 'TEMPERATURE' | 'HUMIDITY';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['TEMPERATURE', 'HUMIDITY'],
  })
  type: SensorType;

  @OneToMany(() => Reading, (reading) => reading.sensor)
  readings: Reading[];
}
