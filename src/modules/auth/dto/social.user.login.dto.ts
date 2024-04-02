import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserType } from '../../../global/enum/UserType.enum';

export default class RequestSocialUserLoginDto {
  @ApiProperty({ example: 'token값' })
  @IsString()
  token: string;

  @ApiProperty({ example: UserType.APPLE, enum: UserType })
  @IsEnum(UserType)
  type: UserType;
}
