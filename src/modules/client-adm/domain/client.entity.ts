import { Entity } from '@shared/domain/entity/entity';
import { Id } from '@shared/domain/value-object/id.value-object';

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export class Client extends Entity {
  private _name: string;
  private _email: string;
  private _document: string;
  private _address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };

  constructor(props: ClientProps) {
    super(props.id);
    this._name = props.name;
    this._email = props.email;
    this._document = props.document;
    this._address = props.address;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
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

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  set document(document: string) {
    this._document = document;
  }

  set address(address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  }) {
    this._address = address;
  }
}