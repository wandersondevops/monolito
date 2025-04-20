import { request } from '../../setup';

describe('Checkout API', () => {
  it('should create an order', async () => {
    // First create a client
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

    const clientResponse = await request.post('/clients').send(client);
    const clientId = clientResponse.body.id;

    // Then create products
    const product1 = {
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    };

    const product2 = {
      name: 'Product 2',
      description: 'Description 2',
      purchasePrice: 200,
      stock: 20,
    };

    const product1Response = await request.post('/products').send(product1);
    const product2Response = await request.post('/products').send(product2);

    // Finally create an order
    const order = {
      clientId,
      products: [
        {
          productId: product1Response.body.id,
          quantity: 2,
        },
        {
          productId: product2Response.body.id,
          quantity: 1,
        },
      ],
    };

    const response = await request.post('/checkout').send(order);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('invoiceId');
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('total');
    expect(response.body.products).toHaveLength(2);
  });
}); 