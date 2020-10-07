import { AggregateRoot } from '../../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Guard } from '../../../core/Guard';
import { Result } from '../../../core/Result';
import { Email } from './email';

interface UserProps {
  username: string;
  firstName: string;
  lastName: string;
  email: Email;
}

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }
  get userName(): string {
    return this.props.username;
  }
  get firstName(): string {
    return this.props.firstName;
  }
  get lastName(): string {
    return this.props.lastName;
  }
  get email(): Email {
    return this.props.email;
  }
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: UserProps, id?: UniqueEntityID) {
    const guardProps = [
      { argument: props.username, argumentName: 'username' },
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardProps);

    if (!guardResult.succeeded) return Result.fail<User>(guardResult.message);
    return Result.ok<User>(new User({ ...props }, id));
  }
}
