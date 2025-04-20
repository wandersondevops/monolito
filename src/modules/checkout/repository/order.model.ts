import { Model, Table, Column, PrimaryKey, HasMany } from 'sequelize-typescript';
import { OrderItemModel } from './order-item.model';

@Table({
  tableName: 'orders',
  timestamps: true,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  clientId: string;

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @HasMany(() => OrderItemModel)
  items: OrderItemModel[];
}
