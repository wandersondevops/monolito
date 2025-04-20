import Address from "../../@shared/domain/value-object/address";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Client } from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export interface ClientRepositoryInterface {
  add(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}

export class ClientRepository implements ClientRepositoryInterface {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      city: client.address.city,
      state: client.address.state,
      zipcode: client.address.zipCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async find(id: string): Promise<Client> {
    const clientModel = await ClientModel.findOne({ where: { id } });
    
    if (!clientModel) {
      throw new Error('Client not found');
    }
    
    return new Client({
      id: new Id(clientModel.id),
      name: clientModel.name,
      email: clientModel.email,
      document: clientModel.document,
      address: {
        street: clientModel.street,
        number: clientModel.number,
        complement: clientModel.complement,
        city: clientModel.city,
        state: clientModel.state,
        zipCode: clientModel.zipcode,
      },
    });
  }
}