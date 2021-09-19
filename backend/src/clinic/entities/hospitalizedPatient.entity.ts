import { Entity, Column } from 'typeorm';
import { Patient } from './patient.entity';
import { config } from 'rxjs';

@Entity({ name: 'patient' })
export class HospitalizedPatient extends Patient {
  @Column({ name: 'dateIn', type: 'date', nullable: true })
  private _dateIn: string;

  @Column({ type: 'date', name: 'dateOut', nullable: true })
  private _dateOut: string;

  @Column({ name: 'room', nullable: true })
  private _room: number;

  hospitalize(dateIn: string, room: number) {
    this._dateIn = dateIn;
    this._room = room;
  }

  discharge(dateOut: string) {
    this._dateOut = dateOut;
    this._room = null;
  }

  isHospitalized(): boolean {
    return !!this._room;
  }
}
