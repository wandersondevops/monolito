import { InvoiceRepository } from "./invoice.repository";
import { Invoice } from "../domain/entity/invoice";
import Id from "../../@shared/domain/value-object/id.value-object";
import { Address } from "../domain/value-object/address";
import { InvoiceItems } from "../domain/entity/invoice-items";

describe("Invoice Repository test", () => {
  it("should create an invoice", async () => {
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

    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const result = await repository.find("1");

    expect(result.id.id).toBe("1");
    expect(result.name).toBe("Invoice 1");
    expect(result.document).toBe("Document 1");
    expect(result.address.street).toBe("Street 1");
    expect(result.address.number).toBe("123");
    expect(result.address.complement).toBe("Complement 1");
    expect(result.address.city).toBe("City 1");
    expect(result.address.state).toBe("State 1");
    expect(result.address.zipCode).toBe("12345-678");
    expect(result.items).toHaveLength(2);
    expect(result.items[0].id.id).toBe("1");
    expect(result.items[0].name).toBe("Item 1");
    expect(result.items[0].price).toBe(100);
    expect(result.items[1].id.id).toBe("2");
    expect(result.items[1].name).toBe("Item 2");
    expect(result.items[1].price).toBe(200);
    expect(result.total).toBe(300);
  });
}); 