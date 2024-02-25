import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import PeepUserSaveDto from '../dto/peepusersave.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller({ path: '/auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '삐약이 유저 생성' })
  @ApiBody({ type: PeepUserSaveDto })
  @UsePipes(ValidationPipe)
  @Post('/user')
  public async savePeepUser(@Body() dto: PeepUserSaveDto): Promise<void> {
    const { token, user } = await this.authService.savePeepUser(dto);
  }
}
