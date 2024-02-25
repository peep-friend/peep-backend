import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class PeepUserSaveDto {
  @ApiProperty({ example: '삐약이 주인' })
  @IsString()
  @IsNotEmpty()
  nickname: string;
}
