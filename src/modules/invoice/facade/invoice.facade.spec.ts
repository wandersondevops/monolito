import { InvoiceFacade } from "./invoice.facade";
import { FindInvoiceUseCase } from "../usecase/find/find-invoice.usecase";
import { GenerateInvoiceUseCase } from "../usecase/generate/generate-invoice.usecase";
import { InvoiceRepository } from "../repository/invoice.repository";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { Invoice } from "../domain/invoice.entity";
import { jest, describe, expect, it, beforeEach } from "@jest/globals";
import { Id } from "@shared/domain/value-object/id.value-object";

// Create a mock implementation of InvoiceRepository
class MockInvoiceRepository implements InvoiceGateway {
  private invoices: Invoice[] = [];

  async generate(invoice: Invoice): Promise<Invoice> {
    this.invoices.push(invoice);
    return invoice;
  }

  async find(id: string): Promise<Invoice> {
    const invoice = this.invoices.find((invoice) => invoice.id.id === id);
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    return invoice;
  }
}

describe("Invoice Facade", () => {
  let repository: MockInvoiceRepository;
  let facade: InvoiceFacade;

  beforeEach(() => {
    repository = new MockInvoiceRepository();
    const findUseCase = new FindInvoiceUseCase(repository);
    const generateUseCase = new GenerateInvoiceUseCase(repository);
    facade = new InvoiceFacade({
      findUseCase,
      generateUseCase,
    });
  });

  it("should generate an invoice", async () => {
    const input = {
      name: "Invoice 1",
      document: "Document 1",
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345-678",
      items: [
        {
          id: `1-${Math.random().toString(36).substring(2, 9)}`,
          name: "Item 1",
          price: 100,
        },
        {
          id: `2-${Math.random().toString(36).substring(2, 9)}`,
          name: "Item 2",
          price: 200,
        },
      ],
    };

    const result = await facade.generate(input);

    expect(result.name).toBe("Invoice 1");
    expect(result.document).toBe("Document 1");
    expect(result.street).toBe("Street 1");
    expect(result.number).toBe("123");
    expect(result.complement).toBe("Complement 1");
    expect(result.city).toBe("City 1");
    expect(result.state).toBe("State 1");
    expect(result.zipCode).toBe("12345-678");
    expect(result.items).toHaveLength(2);
    expect(result.items[0].name).toBe("Item 1");
    expect(result.items[0].price).toBe(100);
    expect(result.items[1].name).toBe("Item 2");
    expect(result.items[1].price).toBe(200);
    expect(result.total).toBe(300);
  });

  it("should find an invoice", async () => {
    // First generate an invoice
    const input = {
      name: "Invoice 1",
      document: "Document 1",
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345-678",
      items: [
        {
          id: `1-${Math.random().toString(36).substring(2, 9)}`,
          name: "Item 1",
          price: 100,
        },
        {
          id: `2-${Math.random().toString(36).substring(2, 9)}`,
          name: "Item 2",
          price: 200,
        },
      ],
    };

    const invoice = await facade.generate(input);

    const result = await facade.find({ id: invoice.id });

    expect(result.name).toBe("Invoice 1");
    expect(result.document).toBe("Document 1");
    expect(result.address.street).toBe("Street 1");
    expect(result.address.number).toBe("123");
    expect(result.address.complement).toBe("Complement 1");
    expect(result.address.city).toBe("City 1");
    expect(result.address.state).toBe("State 1");
    expect(result.address.zipCode).toBe("12345-678");
    expect(result.items).toHaveLength(2);
    expect(result.items[0].name).toBe("Item 1");
    expect(result.items[0].price).toBe(100);
    expect(result.items[1].name).toBe("Item 2");
    expect(result.items[1].price).toBe(200);
    expect(result.total).toBe(300);
  });
}); 