import Id from "../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../domain/entity/invoice";
import { InvoiceItems } from "../domain/entity/invoice-items";
import { Address } from "../domain/value-object/address";
import { InvoiceGateway } from "../gateway/invoice.gateway";

export class InvoiceRepository implements InvoiceGateway {
  private invoices: Invoice[] = [];

  async find(id: string): Promise<Invoice> {
    const invoice = this.invoices.find(invoice => invoice.id.id === id);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    return invoice;
  }

  async generate(invoice: Invoice): Promise<Invoice> {
    this.invoices.push(invoice);
    return invoice;
  }
} 