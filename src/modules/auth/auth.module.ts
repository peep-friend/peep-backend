import { Module } from '@nestjs/common';
import { AuthController } from './contorller/auth.controller';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
