import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "../usecase/find/find-invoice.usecase";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "../usecase/generate/generate-invoice.usecase";

export interface InvoiceFacadeInterface {
  generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto>;
  find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO>;
}

export interface InvoiceFacadeProps {
  findUseCase: any;
  generateUseCase: any;
}

export class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase: any;
  private _generateUseCase: any;

  constructor(props: InvoiceFacadeProps) {
    this._findUseCase = props.findUseCase;
    this._generateUseCase = props.generateUseCase;
  }

  async generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    return await this._generateUseCase.execute(input);
  }

  async find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    return await this._findUseCase.execute(input);
  }
} 