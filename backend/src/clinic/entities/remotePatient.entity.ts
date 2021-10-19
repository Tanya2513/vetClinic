import { Entity, Column } from 'typeorm';
import { Patient } from './patient.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'patient' })
export class RemotePatient extends Patient {
  constructor(
    name: string,
    birthDate: string,
    speciesId: number,
    breed: string,
    diagnosis: string,
    visitDate: string,
    animalOwner: string,
    numberOwner: string,
    remoteVisitDate: string,
    remoteVisitAddress: string,
  ) {
    super(
      name,
      birthDate,
      speciesId,
      breed,
      diagnosis,
      visitDate,
      animalOwner,
      numberOwner,
    );
    this.remoteVisitDate = remoteVisitDate;
    this.remoteVisitAddress = remoteVisitAddress;
  }

  @Column({ nullable: true })
  remoteVisitDate: string;
  @Column({ nullable: true })
  remoteVisitAddress: string;
}
