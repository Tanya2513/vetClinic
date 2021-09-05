import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Species {
  constructor(type: string, description: string) {
    this.type = type;
    this.description = description;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  features: string;

  @OneToMany((type) => Patient, (patient) => patient.species)
  patient: Patient[];
}
