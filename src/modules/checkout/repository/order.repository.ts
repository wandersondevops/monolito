import { Order } from '../domain/order.entity';
import { OrderItem } from '../domain/order-item.entity';
import { OrderModel } from './order.model';
import { OrderItemModel } from './order-item.model';
import { Id } from '@shared/domain/value-object/id.value-object';

export interface OrderRepositoryInterface {
  add(order: Order): Promise<void>;
  find(id: string): Promise<Order>;
}

export class OrderRepository implements OrderRepositoryInterface {
  async add(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id.id,
      clientId: order.clientId,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }, {
      include: [{ model: OrderItemModel }]
    });

    // Add order items
    for (const item of order.items) {
      await OrderItemModel.create({
        id: item.id.id,
        orderId: order.id.id,
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel }],
    });

    if (!orderModel) {
      throw new Error('Order not found');
    }

    // Create the order entity from the model
    const order = new Order({
      id: new Id(orderModel.id),
      clientId: orderModel.clientId,
      items: orderModel.items.map(item => {
        const orderItem = new OrderItem({
          id: new Id(item.id),
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
        return orderItem;
      }),
      status: orderModel.status,
      createdAt: orderModel.createdAt,
      updatedAt: orderModel.updatedAt,
    });

    // Status is already set in the constructor
    
    return order;
  }
} 