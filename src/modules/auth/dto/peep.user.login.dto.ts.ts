import { PartialType } from '@nestjs/swagger';
import PeepUserSaveDto from './peep.user.save.dto.ts';

export default class PeepUserLoginDto extends PartialType(PeepUserSaveDto) {}
