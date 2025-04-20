import Id from "../../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../../domain/entity/invoice";
import { InvoiceItems } from "../../domain/entity/invoice-items";
import { Address } from "../../domain/value-object/address";
import { InvoiceGateway } from "../../gateway/invoice.gateway";

export interface GenerateInvoiceUseCaseInputDto {
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
  }[];
}

export interface GenerateInvoiceUseCaseOutputDto {
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
  }[];
  total: number;
}

export class GenerateInvoiceUseCase {
  constructor(private invoiceGateway: InvoiceGateway) {}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address({
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    });

    const items = input.items.map(item => 
      new InvoiceItems({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      })
    );

    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address,
      items,
    });

    const result = await this.invoiceGateway.generate(invoice);

    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      street: result.address.street,
      number: result.address.number,
      complement: result.address.complement,
      city: result.address.city,
      state: result.address.state,
      zipCode: result.address.zipCode,
      items: result.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: result.total,
    };
  }
} 