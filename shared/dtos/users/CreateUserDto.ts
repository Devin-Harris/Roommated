import {
  ArrayNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BaseUserDto } from './BaseUserDto';

export class CreateUsersDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  items!: CreateUserDto[];
}

export class CreateUserDto extends BaseUserDto {}