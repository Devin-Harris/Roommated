import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type, Exclude } from 'class-transformer';
import { BaseGroupDto } from './BaseGroup.dto';
import { Gender } from '../../enums';
import { ResponseGroupUserDto } from './groupusers';

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

  @Exclude()
  override groupUsers!: ResponseGroupUserDto[];
}

export class UpdateGroupPayloadDto {
  @Type((group) => UpdateGroupDto)
  mutatedGroup!: UpdateGroupDto;

  @IsOptional()
  userIdsToRemove!: number[];

  @IsOptional()
  userIdsToPromote!: number[];

  @IsOptional()
  userIdsToDemote!: number[];
}
