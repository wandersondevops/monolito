import { Id } from "../../../@shared/domain/value-object/id.value-object";

export type InvoiceItemsProps = {
  id?: Id;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class InvoiceItems {
  private _id: Id;
  private _name: string;
  private _price: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: InvoiceItemsProps) {
    this._id = props.id || new Id();
    this._name = props.name;
    this._price = props.price;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  get id(): Id {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  toJSON() {
    return {
      id: this._id.id,
      name: this._name,
      price: this._price,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
} 