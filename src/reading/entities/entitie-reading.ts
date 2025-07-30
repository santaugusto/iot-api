import { Sensor } from 'src/sensor/entities/entitie-sensor';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => Sensor, (s) => s.readings) sensor: Sensor;
  @Column('float') value: number;
  @Column({ type: 'timestamptz' }) timestamp: Date;
}
