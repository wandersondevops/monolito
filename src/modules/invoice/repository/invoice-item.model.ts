import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { InvoiceModel } from './invoice.model';

@Table({
  tableName: 'invoice_items',
  timestamps: true,
})
export class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoiceId: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false, defaultValue: 1 })
  quantity: number;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @BelongsTo(() => InvoiceModel)
  invoice: InvoiceModel;
}
