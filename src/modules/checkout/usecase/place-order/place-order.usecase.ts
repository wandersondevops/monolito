import { ClientRepository } from '../../../client-adm/repository/client.repository';
import { ProductRepository } from '../../../product-adm/repository/product.repository';
import { OrderRepository } from '../../repository/order.repository';
import { Order } from '../../domain/order.entity';
import { OrderItem } from '../../domain/order-item.entity';
import { Invoice } from '../../../invoice/domain/invoice.entity';
import { InvoiceItem } from '../../../invoice/domain/invoice-item.entity';
import { InvoiceRepository } from '../../../invoice/repository/invoice.repository';
import { Id } from '@shared/domain/value-object/id.value-object';

export type PlaceOrderInputDto = {
  clientId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
};

export type PlaceOrderOutputDto = {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string;
    price: number;
    quantity: number;
  }[];
};

export class PlaceOrderUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private invoiceRepository?: InvoiceRepository
  ) {
    this.invoiceRepository = invoiceRepository || new InvoiceRepository();
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this.clientRepository.find(input.clientId);

    const orderItems = await Promise.all(
      input.products.map(async (item) => {
        const product = await this.productRepository.find(item.productId);
        return new OrderItem({
          productId: product.id.id, // Convert Id to string
          name: product.name,
          price: product.purchasePrice,
          quantity: item.quantity,
        });
      })
    );

    const order = new Order({
      clientId: client.id.id, // Convert Id to string
      items: orderItems,
      status: 'pending',
    });

    await this.orderRepository.add(order);

    // Create an invoice for the order
    const invoiceItems = order.items.map(item => {
      return new InvoiceItem({
        id: new Id(),
        name: item.name,
        price: item.price * item.quantity,
      });
    });

    const invoice = new Invoice({
      id: new Id(order.invoiceId.replace('INV-', '')),
      name: client.name,
      document: client.document,
      address: {
        street: client.address.street,
        number: client.address.number,
        complement: client.address.complement,
        city: client.address.city,
        state: client.address.state,
        zipCode: client.address.zipCode,
      },
      items: invoiceItems,
    });

    await this.invoiceRepository.generate(invoice);

    return {
      id: order.id.id,
      invoiceId: order.invoiceId,
      status: order.status,
      total: order.total,
      products: order.items.map((item) => ({
        productId: item.productId, // Already a string
        price: item.price,
        quantity: item.quantity,
      })),
    };
  }
} 