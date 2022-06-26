import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseGroupDto } from './BaseGroup.dto';

export class CreateGroupsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateGroupDto)
  items!: CreateGroupDto[];
}

export class CreateGroupDto extends BaseGroupDto {}
