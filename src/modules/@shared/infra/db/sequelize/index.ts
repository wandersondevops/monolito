import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../../../product-adm/repository/product.model';
import { ClientModel } from '../../../../client-adm/repository/client.model';
import { OrderModel } from '../../../../checkout/repository/order.model';
import { OrderItemModel } from '../../../../checkout/repository/order-item.model';
import { InvoiceModel } from '../../../../invoice/repository/invoice.model';
import { InvoiceItemModel } from '../../../../invoice/repository/invoice-item.model';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
  sync: { force: true },
});

export async function initDb() {
  await sequelize.addModels([
    ProductModel,
    ClientModel,
    OrderModel,
    OrderItemModel,
    InvoiceModel,
    InvoiceItemModel,
  ]);
  await sequelize.sync();
}
