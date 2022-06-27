import { IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ResponseUserDto, ResponseGroupDto } from '../..';
import { Group, GroupInvitation as IGroupInvitation, User } from '../../../interfaces';
import { GroupInvitationState } from '../../../enums';

export class BaseGroupInvitationDto implements IGroupInvitation {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id!: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  groupId!: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  receivingUserId!: number;

  @IsNotEmpty()
  @IsEnum(GroupInvitationState)
  @Expose()
  state!: GroupInvitationState;

  @Expose()
  createDate!: Date;

  @Type((group) => ResponseGroupDto)
  @Expose()
  group!: Group;

  @Type((user) => ResponseUserDto)
  @Expose()
  receivingUser!: User;
}
