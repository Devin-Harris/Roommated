import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../../enums';
import { BaseUserDto } from './BaseUser.dto';

export class UpdateUsersDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserDto)
  items!: UpdateUserDto[];
}

export class UpdateUserDto extends BaseUserDto {
  @IsOptional()
  @IsInt()
  id!: number;

  @IsOptional()
  override firstname!: string;

  @IsOptional()
  override lastname!: string;

  @IsOptional()
  override email!: string;

  @IsOptional()
  override phone!: string;

  @IsOptional()
  override birthdate!: Date;

  @IsOptional()
  override password!: string;

  @IsOptional()
  override profileImageUrl!: string;

  @IsOptional()
  override bio!: string;

  @IsOptional()
  override gender!: Gender;
}
