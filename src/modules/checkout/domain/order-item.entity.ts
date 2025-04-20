import { Entity } from '@shared/domain/entity/entity';
import { Id } from '@shared/domain/value-object/id.value-object';

type OrderItemProps = {
  id?: Id;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class OrderItem extends Entity {
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(props: OrderItemProps) {
    super(props.id);
    this._productId = props.productId;
    this._name = props.name;
    this._price = props.price;
    this._quantity = props.quantity;
  }

  get productId(): string {
    return this._productId;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  set productId(productId: string) {
    this._productId = productId;
  }

  set name(name: string) {
    this._name = name;
  }

  set price(price: number) {
    this._price = price;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }
} 