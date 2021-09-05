import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {Species} from "./species.entity";

@Entity()
export class Patient {
  constructor(name: string, age: string, speciesId: number, visitDate: string) {
    this.name = name;
    this.age = age;
    this.speciesId = speciesId;
    this.visitDate = visitDate;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  speciesId: number;

  @Column()
  diagnosis: string;

  @Column()
  visitDate: string;
}
