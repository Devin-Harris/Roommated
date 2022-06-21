import { ArrayNotEmpty, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Group, User } from '../../../interfaces';
import { BaseUserDto, ResponseUserDto } from '../..';

export class AcceptGroupInvitationDto {
  @IsNotEmpty()
  user!: User;

  @IsNotEmpty()
  group!: Group;
}
