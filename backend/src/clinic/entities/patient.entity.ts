import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  constructor(name: string, age: string, species: string, visitDate: string) {
    this.name = name;
    this.age = age;
    this.species = species;
    this.visitDate = visitDate;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  species: string;

  @Column()
  diagnosis: string;

  @Column()
  visitDate: string;
}
