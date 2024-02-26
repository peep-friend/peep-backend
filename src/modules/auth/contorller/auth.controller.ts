import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import PeepUserSaveDto from '../dto/PeepUserSave.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { AuthResponse } from 'src/global/response/auth.response';
import PeepUserLoginDto from '../dto/PeepUserLogin.dto';

@ApiTags('Auth')
@Controller({ path: '/auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '삐약이 유저 생성' })
  @ApiBody({ type: PeepUserSaveDto })
  @ApiResponse(AuthResponse.savePeepUser[200])
  @Post('/user')
  public async savePeepUser(@Body() dto: PeepUserSaveDto): Promise<void> {
    const { token, user } = await this.authService.savePeepUser(dto);
  }

  public async loginPeepUser(@Body() dto: PeepUserLoginDto) {
    const {user, token} = await this.authService.loginPeepUser(dto);
  }
}
