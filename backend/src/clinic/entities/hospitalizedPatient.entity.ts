import { Entity, Column } from 'typeorm';
import { Patient } from './patient.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'patient' })
export class HospitalizedPatient extends Patient {
  @Exclude()
  @Column({ name: 'dateIn', type: 'date', nullable: true })
  private _dateIn: string;

  @Exclude()
  @Column({ type: 'date', name: 'dateOut', nullable: true })
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
