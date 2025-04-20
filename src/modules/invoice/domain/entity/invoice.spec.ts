import { Invoice } from "./invoice";
import { InvoiceItems } from "./invoice-items";
import { Address } from "../value-object/address";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { jest, describe, expect, it } from "@jest/globals";

describe("Invoice Entity", () => {
  it("should create an invoice", () => {
    const address = new Address({
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345-678",
    });

    const items = [
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
    ];

    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "Document 1",
      address,
      items,
    });

    expect(invoice.id.id).toBe("1");
    expect(invoice.name).toBe("Invoice 1");
    expect(invoice.document).toBe("Document 1");
    expect(invoice.address).toBe(address);
    expect(invoice.items).toEqual(items);
    expect(invoice.total).toBe(300);
  });

  it("should calculate total correctly", () => {
    const address = new Address({
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345-678",
    });

    const items = [
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
      new InvoiceItems({
        id: new Id("3"),
        name: "Item 3",
        price: 300,
      }),
    ];

    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "Document 1",
      address,
      items,
    });

    expect(invoice.total).toBe(600);
  });
}); 