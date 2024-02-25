import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import PeepUserSaveDto from '../dto/peepusersave.dto';
import UserRepository from 'src/modules/user/repository/user.repository';
import * as uuid from 'uuid';
import { DataSource } from 'typeorm';
import { UserType } from 'src/global/enum/UserType.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

  public async savePeepUser(dto: PeepUserSaveDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (findUser) {
      throw new BadRequestException('ExistedUser');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.save(
        this.userRepository.create({
          email: dto.email,
          password: dto.password,
          type: UserType.PEEP,
          lastLoginDate: new Date(),
        }),
      );

      await queryRunner.commitTransaction();

      const token = uuid.v1();

      return {
        token,
        user,
      };
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }

      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }
}
