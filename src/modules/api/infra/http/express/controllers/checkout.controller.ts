import { Request, Response } from 'express';
import { PlaceOrderUseCase } from '../../../../../checkout/usecase/place-order/place-order.usecase';
import { ClientRepository } from '../../../../../client-adm/repository/client.repository';
import { ProductRepository } from '../../../../../product-adm/repository/product.repository';
import { OrderRepository } from '../../../../../checkout/repository/order.repository';
import { InvoiceRepository } from '../../../../../invoice/repository/invoice.repository';

export class CheckoutController {
  async create(request: Request, response: Response) {
    try {
      const { clientId, products } = request.body;

      const clientRepository = new ClientRepository();
      const productRepository = new ProductRepository();
      const orderRepository = new OrderRepository();
      const invoiceRepository = new InvoiceRepository();

      const placeOrderUseCase = new PlaceOrderUseCase(
        clientRepository,
        productRepository,
        orderRepository,
        invoiceRepository
      );

      const output = await placeOrderUseCase.execute({
        clientId,
        products,
      });

      return response.status(201).json(output);
    } catch (error: any) {
      return response.status(500).json({ error: error?.message || 'Internal server error' });
    }
  }
} 