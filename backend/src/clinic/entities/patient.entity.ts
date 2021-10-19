import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Species } from './species.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Patient {
  constructor(
    name: string,
    birthDate: string,
    speciesId: number,
    breed: string,
    diagnosis: string,
    visitDate: string,
    animalOwner: string,
    numberOwner: string,
  ) {
    this.name = name;
    this.birthDate = birthDate;
    this.speciesId = speciesId;
    this.breed = breed;
    this.diagnosis = diagnosis;
    this.visitDate = visitDate;
    this.animalOwner = animalOwner;
    this.numberOwner = numberOwner;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  speciesId: number;

  @Column({ nullable: true })
  breed: string;

  @Column()
  diagnosis: string;

  @Column()
  visitDate: string;

  @Column({ nullable: true })
  birthDate: string;

  @Column({ nullable: true })
  animalOwner: string;

  @Column({ nullable: true })
  numberOwner: string;

  @Expose()
  get age(): number {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  @ManyToOne((type) => Species, (species) => species.patient)
  species: Species;
}
