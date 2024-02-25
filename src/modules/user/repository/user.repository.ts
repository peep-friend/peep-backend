import { Repository } from 'typeorm';
import User from '../domain/user.entity';

export default class UserRepository extends Repository<User> {}
