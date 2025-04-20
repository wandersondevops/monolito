import { Client } from '../../domain/client.entity';
import { ClientRepository } from '../../repository/client.repository';

export type CreateClientInputDto = {
  name: string;
  email: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

export type CreateClientOutputDto = {
  id: string;
  name: string;
  email: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(input: CreateClientInputDto): Promise<CreateClientOutputDto> {
    const client = new Client({
      name: input.name,
      email: input.email,
      document: input.document,
      address: {
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      },
    });

    await this.clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
    };
  }
} 