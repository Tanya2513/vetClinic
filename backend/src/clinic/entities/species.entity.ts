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
  public id: number;

  @Column()
  public type: string;

  @Column()
  public description: string;

  @Column()
  public features: string;

  @OneToMany((type) => Patient, (patient) => patient.species)
  public patient: Patient[];
}
