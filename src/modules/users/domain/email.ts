import { ValueObject } from '../../../core/domain/ValueObject';
import { Guard } from '../../../core/Guard';
import { Result } from '../../../core/Result';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  get value(): string {
    return this.props.value;
  }
  private constructor(props: EmailProps) {
    super(props);
  }
  public static create(email: string): Result<Email> {
    const guardResult = Guard.againstNullOrUndefined(email, 'email');
    if (!guardResult.succeeded) return Result.fail<Email>(guardResult.message);
    return Result.ok<Email>(new Email({ value: email }));
  }
}
