import { Result } from './Result';

interface DomainError {
  message: string;
  error?: any;
}
export namespace AppError {
  export class UnexpectedError extends Result<DomainError> {
    public constructor(err: any) {
      super(false, { message: `An unexpected error occured`, error: err });
    }
    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
