import { Patient } from './patient.entity';

export default class PatientList {
  private _list: Patient[];

  constructor(list: Patient[]) {
    this._list = list;
  }

  get list(): Patient[] {
    return this._list;
  }

  set list(value: Patient[]) {
    this._list = value;
  }
}
