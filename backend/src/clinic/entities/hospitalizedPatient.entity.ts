import { Entity, Column } from 'typeorm';
import { Patient } from './patient.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'patient' })
export class HospitalizedPatient extends Patient {
  constructor(
    name: string,
    birthDate: string,
    speciesId: number,
    breed: string,
    diagnosis: string,
    visitDate: string,
    animalOwner: string,
    numberOwner: string,
    dateIn: string,
    dateOut: string,
    room: number,
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
    this._dateIn = dateIn;
    this._dateOut = dateOut;
    this._room = room;
  }

  @Exclude()
  @Column({ name: 'dateIn', nullable: true })
  private _dateIn: string;

  @Exclude()
  @Column({ name: 'dateOut', nullable: true })
  private _dateOut: string;

  @Exclude()
  @Column({ name: 'room', nullable: true })
  private _room: number;

  public hospitalize(dateIn: string, room: number) {
    this._dateIn = dateIn;
    this._room = room;
  }

  public discharge(dateOut: string) {
    this._dateOut = dateOut;
    this._room = null;
  }

  public isHospitalized(): boolean {
    return !!this._room;
  }

  @Expose()
  get dateIn(): string {
    return this._dateIn;
  }

  @Expose()
  get dateOut(): string {
    return this._dateOut;
  }

  @Expose()
  get room(): number {
    return this._room;
  }
}
