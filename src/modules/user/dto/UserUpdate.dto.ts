import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class UserUpdateDto {
  @ApiProperty({ example: '병아리 엄마' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'yoonalim2003@gmail.com' })
  @IsString()
  email: string;
}
