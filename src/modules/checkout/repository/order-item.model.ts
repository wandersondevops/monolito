import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { OrderModel } from './order.model';

@Table({
  tableName: 'order_items',
  timestamps: true,
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  orderId: string;

  @Column({ allowNull: false })
  productId: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false })
  quantity: number;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @BelongsTo(() => OrderModel)
  order: OrderModel;
}
