import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import UserController from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from './repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
