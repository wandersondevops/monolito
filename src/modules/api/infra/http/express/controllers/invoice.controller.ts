import { Request, Response } from 'express';
import { FindInvoiceUseCase } from '../../../../../invoice/usecase/find-invoice/find-invoice.usecase';
import { InvoiceRepository } from '../../../../../invoice/repository/invoice.repository';

export class InvoiceController {
  async find(request: Request, response: Response) {
    try {
      let { id } = request.params;
      
      // Remove 'INV-' prefix if it exists
      if (id.startsWith('INV-')) {
        id = id.replace('INV-', '');
      }

      const invoiceRepository = new InvoiceRepository();
      const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);

      const output = await findInvoiceUseCase.execute({ id });

      return response.status(200).json(output);
    } catch (error: any) {
      console.error('Error finding invoice:', error);
      return response.status(500).json({ error: error?.message || 'Internal server error' });
    }
  }
} 