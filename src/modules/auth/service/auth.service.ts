import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { DataSource, Repository } from 'typeorm';
import { UserType } from 'src/global/enum/UserType.enum';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/modules/user/domain/user.entity';
import * as bcrypt from 'bcrypt';
import PeepUserLoginDto from '../dto/peep.user.login.dto';
import JwtTokenDto from '../dto/create.access.token.dto';
import { ConfigService } from '@nestjs/config';
import PeepUserSaveDto from '../dto/peep.user.save.dto';
import RequestSocialUserSaveDto from '../dto/social.user.save.dto';
import RequestSocialUserLoginDto from '../dto/social.user.login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async saveSocialUser(dto: RequestSocialUserSaveDto) {
    const userExist = await this.userRepository.exists({
      where: {
        type: dto.type,
        token: dto.token,
      },
    });

    if (userExist) {
      throw new BadRequestException('이미 회원가입 되어있는 유저입니다.');
    }

    const isExistedByEmail = await this.userRepository.exists({
      where: { email: dto.email },
    });

    if (isExistedByEmail) {
      throw new BadRequestException('사용 중인 이메일입니다.');
    }
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.save(
        this.userRepository.create({
          token: dto.token,
          email: dto.email,
          type: dto.type,
          lastLoginDate: new Date(),
        }),
      );

      const token = this.createToken(user);

      return { user, token };
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

  public async loginSocialUser(dto: RequestSocialUserLoginDto) {
    const socialUser = await this.findUserByToken(dto.token, dto.type);

    if (!socialUser) {
      throw new NotFoundException('해당 유저가 없습니다.');
    }

    await this.userRepository.update(socialUser.id, {
      lastLoginDate: new Date(),
    });

    const token = this.createToken(socialUser);

    return { token, socialUser };
  }

  public async savePeepUser(dto: PeepUserSaveDto) {
    const userExist = await this.checkUserExists(dto.email);

    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 이메일은 이미 가입되어 있는 유저입니다.',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await queryRunner.manager.save(
        this.userRepository.create({
          email: dto.email,
          password: hashedPassword,
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

  public async loginPeepUser(dto: PeepUserLoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    const result = await bcrypt.compare(dto.password, user.password);

    if (!result) {
      throw new BadRequestException('잘못된 비밀번호입니다.');
    }

    await this.userRepository.update(user.id, {
      lastLoginDate: new Date(),
    });

    const token = this.createToken(user);

    return { token, user };
  }

  public async findUserByJwt(id: number): Promise<any> {
    const findUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!findUser) {
      throw new NotFoundException('Not Found User');
    }
    return findUser;
  }

  public createToken(user: User) {
    const id = user.id;
    const tokenDto = new JwtTokenDto(
      this.createAccessToken(user),
      this.createRefreshToken(id),
    );
    return tokenDto;
  }

  public createAccessToken(user: User) {
    const cu = { id: user.id, email: user.email };
    return this.jwtService.sign(cu, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
  }

  public createRefreshToken(id: number) {
    return this.jwtService.sign(
      { id },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      },
    );
  }

  private async findUserByToken(token: string, type: UserType) {
    const user = await this.userRepository.findOne({
      where: { token, type },
      select: ['id', 'nickname', 'email', 'password'],
    });

    return user;
  }

  private async checkUserExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    return !!user;
  }
}
