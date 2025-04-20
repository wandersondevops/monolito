import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Address } from "../value-object/address";
import { InvoiceItems } from "./invoice-items";

export type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Invoice {
  private _id: Id;
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: InvoiceItems[];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: InvoiceProps) {
    this._id = props.id || new Id();
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  get id(): Id {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }

  get items(): InvoiceItems[] {
    return this._items;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get total(): number {
    return this._items.reduce((total, item) => total + item.price, 0);
  }

  toJSON() {
    return {
      id: this._id.id,
      name: this._name,
      document: this._document,
      address: this._address.toJSON(),
      items: this._items.map(item => item.toJSON()),
      total: this.total,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
} 