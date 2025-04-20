import { Entity } from '@shared/domain/entity/entity';
import { Id } from '@shared/domain/value-object/id.value-object';
import { InvoiceItem } from './invoice-item.entity';

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: InvoiceItem[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Invoice extends Entity {
  private _name: string;
  private _document: string;
  private _address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  private _items: InvoiceItem[];

  constructor(props: InvoiceProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  } {
    return this._address;
  }

  get items(): InvoiceItem[] {
    return this._items;
  }

  get total(): number {
    return this._items.reduce((total, item) => total + item.price, 0);
  }
} 