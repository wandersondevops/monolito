import { request } from '../../setup';

describe('Client API', () => {
  it('should create a client', async () => {
    const client = {
      name: 'Client 1',
      email: 'client@email.com',
      document: '12345678900',
      street: 'Street 1',
      number: '123',
      complement: 'Complement 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '12345678',
    };

    const response = await request.post('/clients').send(client);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(client.name);
    expect(response.body.email).toBe(client.email);
    expect(response.body.document).toBe(client.document);
    expect(response.body.street).toBe(client.street);
    expect(response.body.number).toBe(client.number);
    expect(response.body.complement).toBe(client.complement);
    expect(response.body.city).toBe(client.city);
    expect(response.body.state).toBe(client.state);
    expect(response.body.zipCode).toBe(client.zipCode);
  });
}); 