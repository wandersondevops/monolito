import { Model, Table, Column, PrimaryKey, HasMany } from 'sequelize-typescript';
import { InvoiceItemModel } from './invoice-item.model';

@Table({
  tableName: 'invoices',
  timestamps: true,
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  number: string;

  @Column({ allowNull: true })
  complement: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  state: string;

  @Column({ allowNull: false })
  zipcode: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @HasMany(() => InvoiceItemModel)
  items: InvoiceItemModel[];
}
