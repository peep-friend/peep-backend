import { Body, Controller, Put } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import RequestUserUpdateDto from '../dto/UserUpdate.dto';

@ApiTags('User')
@Controller({ path: '/user', version: '1' })
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiBody({ type: RequestUserUpdateDto })
  @Put('/')
  public async updateUser(@Body() dto: RequestUserUpdateDto) {
    //return await this.userService.updateUser(dto);
  }
}
