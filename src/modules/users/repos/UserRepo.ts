import { IDatabase } from '../../../core/infra/Database';
import { Repo } from '../../../core/infra/Repo';
import { User } from '../domain/user';
import { UserMap } from '../mappers/UserMap';

export interface IUserRepo extends Repo<User> {}

export class UserRepo implements IUserRepo {
  private db: IDatabase;
  constructor(db: any) {
    this.db = db;
  }
  async save(user: User): Promise<void> {
    const userId = user.id.toString();
    const userExist = this.exists(userId);
    const rawUser = UserMap.toPersistance(user);

    if (!userExist) {
      this.db.insert(userId, rawUser);
    } else {
      this.db.findAndUpdate(userId, rawUser);
    }
  }
  async exists(id: string): Promise<boolean> {
    return await this.db.has(id);
  }
}
