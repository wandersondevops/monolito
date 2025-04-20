import { InvoiceRepository } from '../../repository/invoice.repository';

export type FindInvoiceInputDto = {
  id: string;
};

export type FindInvoiceOutputDto = {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
};

export class FindInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {
    const invoice = await this.invoiceRepository.find(input.id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
        quantity: 1, // InvoiceItem doesn't have quantity property, setting default value
      })),
      total: invoice.total,
    };
  }
} 