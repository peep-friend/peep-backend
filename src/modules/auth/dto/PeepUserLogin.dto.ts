import { PartialType } from '@nestjs/swagger';
import PeepUserSaveDto from './PeepUserSave.dto';

export default class PeepUserLoginDto extends PartialType(PeepUserSaveDto) {}
