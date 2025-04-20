import { Invoice } from '../domain/invoice.entity';
import { InvoiceItem } from '../domain/invoice-item.entity';
import { InvoiceGateway } from '../gateway/invoice.gateway';
import { InvoiceModel } from './invoice.model';
import { InvoiceItemModel } from './invoice-item.model';
import { Id } from '@shared/domain/value-object/id.value-object';

export interface InvoiceRepositoryInterface extends InvoiceGateway {}

export class InvoiceRepository implements InvoiceRepositoryInterface {
  async generate(invoice: Invoice): Promise<Invoice> {
    try {
      await InvoiceModel.create({
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipcode: invoice.address.zipCode,
        createdAt: invoice.createdAt || new Date(),
        updatedAt: invoice.updatedAt || new Date(),
      });

      // Add invoice items separately to avoid association issues
      for (const item of invoice.items) {
        await InvoiceItemModel.create({
          id: item.id.id,
          invoiceId: invoice.id.id,
          name: item.name,
          price: item.price,
          quantity: 1, // InvoiceItem doesn't have quantity in the entity, but we need it for the model
          createdAt: item.createdAt || new Date(),
          updatedAt: item.updatedAt || new Date(),
        });
      }
    } catch (error) {
      console.error('Error generating invoice:', error);
      throw error;
    }

    return invoice;
  }

  async find(id: string): Promise<Invoice> {
    const invoiceModel = await InvoiceModel.findOne({
      where: { id },
      include: [{ model: InvoiceItemModel }],
    });

    if (!invoiceModel) {
      throw new Error('Invoice not found');
    }

    // Create the invoice entity from the model
    const invoice = new Invoice({
      id: new Id(invoiceModel.id),
      name: invoiceModel.name,
      document: invoiceModel.document,
      address: {
        street: invoiceModel.street,
        number: invoiceModel.number,
        complement: invoiceModel.complement,
        city: invoiceModel.city,
        state: invoiceModel.state,
        zipCode: invoiceModel.zipcode,
      },
      items: invoiceModel.items.map(item => {
        const invoiceItem = new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
        return invoiceItem;
      }),
      createdAt: invoiceModel.createdAt,
      updatedAt: invoiceModel.updatedAt,
    });
    
    return invoice;
  }
} 