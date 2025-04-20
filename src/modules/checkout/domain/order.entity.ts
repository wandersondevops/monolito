import { Entity } from '@shared/domain/entity/entity';
import { Id } from '@shared/domain/value-object/id.value-object';
import { OrderItem } from './order-item.entity';

type OrderProps = {
  id?: Id;
  clientId: string;
  items: OrderItem[];
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Order extends Entity {
  private _clientId: string;
  private _items: OrderItem[];
  private _status: string;
  private _total: number;

  constructor(props: OrderProps) {
    super(props.id);
    this._clientId = props.clientId;
    this._items = props.items;
    this._status = props.status || 'pending';
    this._total = this._items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get clientId(): string {
    return this._clientId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  get status(): string {
    return this._status;
  }

  get total(): number {
    return this._total;
  }

  get invoiceId(): string {
    return `INV-${this._id.id}`;
  }

  set clientId(clientId: string) {
    this._clientId = clientId;
  }

  set items(items: OrderItem[]) {
    this._items = items;
    this._total = this._items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  set status(status: string) {
    this._status = status;
  }
} 