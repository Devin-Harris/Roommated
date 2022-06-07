import { Group as IGroup } from '../../interfaces';
import { IsNumber, IsEnum, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Gender, GroupRole } from '../../enums';

export class BaseGroupDto implements IGroup {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  size!: number;

  @IsNotEmpty()
  @IsEnum(Gender)
  @Expose()
  gender!: Gender;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name!: string;

  @IsNotEmpty()
  @IsEnum(GroupRole)
  @Expose()
  groupRole!: GroupRole;

  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  showOnPosts!: boolean;
}
