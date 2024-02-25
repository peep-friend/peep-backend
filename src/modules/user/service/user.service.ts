import { Injectable } from '@nestjs/common';
import RequestUserUpdateDto from '../dto/RequestUserUpdate.dto';
import User from '../domain/user.entity';

@Injectable()
export class UserService {
  constructor() {} //private readonly userRepository: UserRepository,

  public async updateUser(dto: RequestUserUpdateDto, user: User) {}
}
