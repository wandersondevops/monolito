import { Request, Response } from 'express';
import { CreateClientUseCase } from '../../../../../client-adm/usecase/create-client/create-client.usecase';
import { ClientRepository } from '../../../../../client-adm/repository/client.repository';

export class ClientController {
  async create(request: Request, response: Response) {
    try {
      const { name, email, document, street, number, complement, city, state, zipCode } = request.body;

      const clientRepository = new ClientRepository();
      const createClientUseCase = new CreateClientUseCase(clientRepository);

      const output = await createClientUseCase.execute({
        name,
        email,
        document,
        street,
        number,
        complement,
        city,
        state,
        zipCode,
      });

      return response.status(201).json(output);
    } catch (error: any) {
      return response.status(500).json({ error: error?.message || 'Internal server error' });
    }
  }
} 