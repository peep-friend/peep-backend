import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import UserController from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './domain/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
