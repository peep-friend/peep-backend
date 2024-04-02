import { PartialType } from '@nestjs/swagger';
import PeepUserSaveDto from './peep.user.save.dto';

export default class PeepUserLoginDto extends PartialType(PeepUserSaveDto) {}
