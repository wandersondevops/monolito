import { Product } from '../../domain/product.entity';
import { ProductRepository } from '../../repository/product.repository';

export type CreateProductInputDto = {
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
};

export type CreateProductOutputDto = {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
};

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(input: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const product = new Product({
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    });

    await this.productRepository.add(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
    };
  }
} 