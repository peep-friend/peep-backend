import { Injectable, NotFoundException } from '@nestjs/common';
import RequestUserUpdateDto from '../dto/UserUpdate.dto';
import User from '../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async updateUser(dto: RequestUserUpdateDto, user: User) {
    await this.userRepository.update(user.id, {
      nickname: dto.nickname,
      email: dto.email,
    });
  }

  public async findUser(user: User) {
    const findUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!findUser) {
      throw new NotFoundException('Not Found User');
    }

    return findUser;
  }
}
