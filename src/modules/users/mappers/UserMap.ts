import { UniqueEntityID } from '../../../core/domain/UniqueEntityID';
import { Email } from '../domain/email';
import { User } from '../domain/user';

export class UserMap {
  public static toPersistance(user: User) {
    return {
      id: user.id.toString(),
      username: user.userName,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email.props.value,
    };
  }
  public static toDomain(raw: any): User {
    const user = User.create(
      {
        username: raw.username,
        firstName: raw.first_name,
        lastName: raw.last_name,
        email: Email.create(raw.email).getValue(),
      },
      new UniqueEntityID(raw.id)
    );
    return user.getValue();
  }
}
