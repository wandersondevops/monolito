import { Invoice } from "../domain/entity/invoice";

export interface InvoiceGateway {
  find(id: string): Promise<Invoice>;
  generate(invoice: Invoice): Promise<Invoice>;
} 