import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BaseGroupDto } from './BaseGroup.dto';
import { Gender, GroupRole } from '../../enums';

export class UpdateGroupsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateGroupDto)
  items!: UpdateGroupDto[];
}

export class UpdateGroupDto extends BaseGroupDto {
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @IsOptional()
  override size!: number;

  @IsOptional()
  override gender!: Gender;

  @IsOptional()
  override name!: string;

  @IsOptional()
  override showOnPosts!: boolean;
}
