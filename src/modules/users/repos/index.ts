import { Database } from '../../../core/infra/Database';
import { UserRepo } from './UserRepo';

const DB = new Database();
const userRepo = new UserRepo(DB);

export { DB, userRepo };
