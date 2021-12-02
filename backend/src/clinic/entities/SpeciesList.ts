import { Species } from './species.entity';

export default class SpeciesList {
  private _list: Species[];

  constructor(list: Species[]) {
    this._list = list;
  }

  get list(): Species[] {
    return this._list;
  }

  set list(value: Species[]) {
    this._list = value;
  }
}
