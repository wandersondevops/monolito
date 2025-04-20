import { request } from '../../setup';

describe('Invoice API', () => {
  it('should find an invoice', async () => {
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

    // Then create a product
    const product = {
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    };

    const productResponse = await request.post('/products').send(product);

    // Create an order
    const order = {
      clientId,
      products: [
        {
          productId: productResponse.body.id,
          quantity: 2,
        },
      ],
    };

    const orderResponse = await request.post('/checkout').send(order);
    const invoiceId = orderResponse.body.invoiceId;

    // Find the invoice
    const response = await request.get(`/invoice/${invoiceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('document');
    expect(response.body).toHaveProperty('street');
    expect(response.body).toHaveProperty('number');
    expect(response.body).toHaveProperty('complement');
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('state');
    expect(response.body).toHaveProperty('zipCode');
    expect(response.body).toHaveProperty('items');
    expect(response.body.items).toHaveLength(1);
    expect(response.body).toHaveProperty('total');
  });
}); 