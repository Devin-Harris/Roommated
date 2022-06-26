import { IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ResponseUserDto } from './../../../dtos';
import { User, GroupUser as IGroupUser, Group } from './../../../interfaces';
import { GroupUserRole } from './../../../enums';
import { ResponseGroupDto } from '../ResponseGroup.dto';

export class BaseGroupUserDto implements IGroupUser {
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
  userId!: number;

  @IsNotEmpty()
  @IsEnum(GroupUserRole)
  @Expose()
  groupRole!: GroupUserRole;

  @Type((group) => ResponseGroupDto)
  @Expose()
  group!: Group;

  @Type((user) => ResponseUserDto)
  @Expose()
  user!: User;
}
