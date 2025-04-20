import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { GenerateInvoiceUseCase } from "./generate-invoice.usecase";
import { jest, describe, expect, it } from "@jest/globals";
import { Invoice } from "../../domain/entity/invoice";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { Address } from "../../domain/value-object/address";
import { InvoiceItems } from "../../domain/entity/invoice-items";

const mockInvoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "Document 1",
  address: new Address({
    street: "Street 1",
    number: "123",
    complement: "Complement 1",
    city: "City 1",
    state: "State 1",
    zipCode: "12345-678",
  }),
  items: [
    new InvoiceItems({
      id: new Id("1"),
      name: "Item 1",
      price: 100,
    }),
    new InvoiceItems({
      id: new Id("2"),
      name: "Item 2",
      price: 200,
    }),
  ],
});

const MockRepository = (): InvoiceGateway => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(mockInvoice)) as any,
    generate: jest.fn().mockReturnValue(Promise.resolve(mockInvoice)) as any,
  };
};

describe("Generate Invoice UseCase", () => {
  it("should generate an invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

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
          id: "1",
          name: "Item 1",
          price: 100,
        },
        {
          id: "2",
          name: "Item 2",
          price: 200,
        },
      ],
    };

    const result = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalled();
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
}); 