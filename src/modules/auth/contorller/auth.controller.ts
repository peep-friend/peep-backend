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
import PeepUserLoginDto from '../dto/peep.user.login.dto';
import PeepUserSaveDto from '../dto/peep.user.save.dto';
import RequestSocialUserSaveDto from '../dto/social.user.save.dto';
import CommonResponse from 'src/global/dto/api.response';
import RequestSocialUserLoginDto from '../dto/social.user.login.dto';

@ApiTags('Auth')
@Controller({ path: '/auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '소셜 유저 생성' })
  @ApiBody({ type: RequestSocialUserSaveDto })
  @Post('social/user')
  public async saveSocialUser(@Body() dto: RequestSocialUserSaveDto) {
    const { user, token } = await this.authService.saveSocialUser(dto);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '회원가입 성공',
      data: {
        token: token,
        user: {
          email: user.email,
        },
      },
    });
  }

  @ApiOperation({ summary: '삐약이 유저 생성' })
  @ApiBody({ type: PeepUserSaveDto })
  @Post('/user')
  public async savePeepUser(@Body() dto: PeepUserSaveDto) {
    const { token, user } = await this.authService.savePeepUser(dto);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '회원가입 성공',
      data: {
        token: token,
        user: {
          email: user.email,
        },
      },
    });
  }

  @ApiOperation({ summary: '소셜 유저 로그인' })
  @ApiBody({ type: RequestSocialUserLoginDto })
  @Post('/social')
  public async loginSocialUser(@Body() dto: RequestSocialUserLoginDto) {
    const { token, socialUser } = await this.authService.loginSocialUser(dto);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '로그인 성공',
      data: {
        token: token,
        user: {
          nickname: socialUser.nickname,
          emial: socialUser.email,
        },
      },
    });
  }

  @ApiOperation({ summary: '삐약이 유저 로그인' })
  @ApiBody({ type: PeepUserLoginDto })
  @Post('/')
  public async loginPeepUser(@Body() dto: PeepUserLoginDto) {
    const { user, token } = await this.authService.loginPeepUser(dto);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '로그인 성공',
      data: {
        token: token,
        user: {
          email: user.email,
          nickname: user.nickname,
        },
      },
    });
  }
}
