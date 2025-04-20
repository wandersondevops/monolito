import { Id } from '../value-object/id.value-object';

export abstract class Entity {
  protected _id: Id;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  constructor(id?: Id) {
    this._id = id || new Id();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): Id {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected setUpdatedAt(): void {
    this._updatedAt = new Date();
  }
} 