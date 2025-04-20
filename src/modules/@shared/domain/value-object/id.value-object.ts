import { v4 as uuid } from 'uuid';

export class Id {
  private _id: string;

  constructor(id?: string) {
    this._id = id || uuid();
  }

  get id(): string {
    return this._id;
  }

  equals(id: Id): boolean {
    return this._id === id.id;
  }
}
