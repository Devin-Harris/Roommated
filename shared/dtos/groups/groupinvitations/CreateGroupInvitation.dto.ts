import { ArrayNotEmpty, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from './../../../interfaces';
import { BaseUserDto, ResponseUserDto } from './../../../dtos';

export class CreateGroupInvitationsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateGroupInvitationDto)
  items!: CreateGroupInvitationDto[];
}

export class CreateGroupInvitationDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => BaseUserDto)
  users!: User[];

  @IsNotEmpty()
  groupId!: number;
}
