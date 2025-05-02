import { PartialType } from '@nestjs/swagger';
import { CheckingDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CheckingDto) {}
