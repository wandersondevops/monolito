import Id from "../../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../../domain/entity/invoice";
import { InvoiceItems } from "../../domain/entity/invoice-items";
import { Address } from "../../domain/value-object/address";
import { FindInvoiceUseCase } from "./find-invoice.usecase";
import { jest, describe, expect, it } from "@jest/globals";
import { InvoiceGateway } from "../../gateway/invoice.gateway";

const invoice = new Invoice({
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
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)) as any,
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)) as any,
  };
};

describe("Find Invoice UseCase", () => {
  it("should find an invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalledWith("1");
    expect(result.id).toBe("1");
    expect(result.name).toBe("Invoice 1");
    expect(result.document).toBe("Document 1");
    expect(result.address.street).toBe("Street 1");
    expect(result.address.number).toBe("123");
    expect(result.address.complement).toBe("Complement 1");
    expect(result.address.city).toBe("City 1");
    expect(result.address.state).toBe("State 1");
    expect(result.address.zipCode).toBe("12345-678");
    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("Item 1");
    expect(result.items[0].price).toBe(100);
    expect(result.items[1].id).toBe("2");
    expect(result.items[1].name).toBe("Item 2");
    expect(result.items[1].price).toBe(200);
    expect(result.total).toBe(300);
  });
}); 