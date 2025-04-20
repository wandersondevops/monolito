import { request } from '../../setup';

describe('Product API', () => {
  it('should create a product', async () => {
    const product = {
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10,
    };

    const response = await request.post('/products').send(product);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(product.name);
    expect(response.body.description).toBe(product.description);
    expect(response.body.purchasePrice).toBe(product.purchasePrice);
    expect(response.body.stock).toBe(product.stock);
  });
}); 