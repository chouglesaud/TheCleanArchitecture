import { DomainError } from '../../../../core/AppError';
import { Result } from '../../../../core/Result';

export namespace CreateUserError {
  export class EmailInvalidError extends Result<DomainError> {
    public constructor(email: string) {
      super(false, { message: `The email ${email} is invalid` });
    }
  }
}
