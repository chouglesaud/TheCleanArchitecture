import { UseCase } from '../../../../core/domain/UseCase';
import { Result } from '../../../../core/Result';
import { Email } from '../../domain/email';
import { User } from '../../domain/user';
import { IUserRepo } from '../../repos/UserRepo';

type Request = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};
type Response = Result<any>;

export class CreateUser implements UseCase<Request, Response> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }
  public async execute(request: Request): Promise<Response> {
    const { username, firstName, lastName, email } = request;

    const emailOrError: Result<Email> = Email.create(email);

    if (emailOrError.isFailure) {
      return Result.fail<any>(emailOrError.error);
    }
    const user = User.create({
      username,
      firstName,
      lastName,
      email: emailOrError.getValue(),
    }).getValue();

    await this.userRepo.save(user);
    return;
  }
}
