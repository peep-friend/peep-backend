import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class JwtTokenDto {
  @ApiProperty({ example: 'yoonalim2003@gmail.com' })
  @IsString()
  accessToken: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export class reissueTokenDto extends PickType(JwtTokenDto, [
  'refreshToken',
] as const) {}
