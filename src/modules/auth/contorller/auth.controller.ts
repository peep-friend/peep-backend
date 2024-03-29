import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { AuthResponse } from 'src/global/response/auth.response';
import PeepUserLoginDto from '../dto/peep.user.login.dto.ts';
import PeepUserSaveDto from '../dto/peep.user.save.dto.ts';

@ApiTags('Auth')
@Controller({ path: '/auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '삐약이 유저 생성' })
  @ApiBody({ type: PeepUserSaveDto })
  @Post('/user')
  public async savePeepUser(@Body() dto: PeepUserSaveDto): Promise<void> {
    const { token, user } = await this.authService.savePeepUser(dto);
  }

  @ApiOperation({ summary: '삐약이 유저 로그인' })
  @ApiBody({ type: PeepUserLoginDto })
  @Post('/')
  public async loginPeepUser(@Body() dto: PeepUserLoginDto) {
    const { user, token } = await this.authService.loginPeepUser(dto);
  }
}
