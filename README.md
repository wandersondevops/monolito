# Invoice Management System

A clean architecture-based invoice management system built with TypeScript.

## Project Structure

The project follows Clean Architecture principles with the following structure:

```
src/
├── modules/
│   └── invoice/
│       ├── domain/
│       │   ├── entity/
│       │   │   ├── invoice.ts
│       │   │   └── invoice-items.ts
│       │   └── value-object/
│       │       └── address.ts
│       ├── facade/
│       │   └── invoice.facade.ts
│       ├── factory/
│       │   └── invoice.factory.ts
│       ├── gateway/
│       │   └── invoice.gateway.ts
│       ├── repository/
│       │   └── invoice.repository.ts
│       └── usecase/
│           ├── find/
│           │   └── find-invoice.usecase.ts
│           └── generate/
│               └── generate-invoice.usecase.ts
```

## Features

- Invoice creation and management
- Invoice search functionality
- Address management
- Invoice items management
- Total price calculation
- Clean Architecture implementation
- TypeScript for type safety
- Jest for testing

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

## Project Architecture

The project follows Clean Architecture principles:

- **Domain Layer**: Contains business rules and entities
  - Entities: Invoice, InvoiceItems
  - Value Objects: Address

- **Application Layer**: Contains use cases
  - Find Invoice
  - Generate Invoice

- **Infrastructure Layer**: Contains implementations
  - Repository
  - Gateway

- **Interface Layer**: Contains facades and factories
  - Invoice Facade
  - Invoice Factory

## Usage

### Creating an Invoice

```typescript
import { InvoiceFacadeFactory } from './modules/invoice/factory/invoice.factory';

const facade = InvoiceFacadeFactory.create();

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
      price: 100
    },
    {
      id: "2",
      name: "Item 2",
      price: 200
    }
  ]
};

const result = await facade.generate(input);
```

### Finding an Invoice

```typescript
import { InvoiceFacadeFactory } from './modules/invoice/factory/invoice.factory';

const facade = InvoiceFacadeFactory.create();
const invoice = await facade.find({ id: "1" });
```

## Testing

The project uses Jest for testing. Tests are organized in the same directory structure as the source code with `.spec.ts` extension.

To run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 