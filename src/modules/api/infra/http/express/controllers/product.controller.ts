import { Request, Response } from 'express';
import { CreateProductUseCase } from '../../../../../product-adm/usecase/create-product/create-product.usecase';
import { ProductRepository } from '../../../../../product-adm/repository/product.repository';

export class ProductController {
  async create(request: Request, response: Response) {
    try {
      const { name, description, purchasePrice, stock } = request.body;

      const productRepository = new ProductRepository();
      const createProductUseCase = new CreateProductUseCase(productRepository);

      const output = await createProductUseCase.execute({
        name,
        description,
        purchasePrice,
        stock,
      });

      return response.status(201).json(output);
    } catch (error: any) {
      return response.status(500).json({ error: error?.message || 'Internal server error' });
    }
  }
} 