import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import RequestUserUpdateDto from '../dto/UserUpdate.dto';
import { JwtAuthGuard } from 'src/modules/auth/passport/jwt.auth.guard';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from 'src/global/response/common';
import User from '../domain/user.entity';
import CommonResponse from 'src/global/dto/api.response';
import { GetUser } from 'src/global/decorators/user/user.decorators';

@ApiTags('User')
@ApiResponse(createServerExceptionResponse())
@ApiResponse(createUnauthorizedResponse())
@Controller({ path: '/user', version: '1' })
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiBody({ type: RequestUserUpdateDto })
  @UseGuards(JwtAuthGuard)
  @Put('/')
  public async updateUser(
    @Body() dto: RequestUserUpdateDto,
    @GetUser() user: User,
  ) {
    await this.userService.updateUser(dto, user);

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: 'Update User',
    });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 조회' })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async findUser(@GetUser() user: User) {
    const findUser = await this.userService.findUser(user);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '유저 정보를 조회합니다.',
      data: findUser,
    });
  }
}
