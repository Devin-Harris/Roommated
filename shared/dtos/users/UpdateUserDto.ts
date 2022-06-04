import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '@rmtd/common/enums';
import { BaseUserDto } from './BaseUserDto';

export class UpdateUsersDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserDto)
  items!: UpdateUserDto[];
}

export class UpdateUserDto extends BaseUserDto {
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @IsOptional()
  firstname!: string;

  @IsOptional()
  lastname!: string;

  @IsOptional()
  email!: string;

  @IsOptional()
  phone!: string;

  @IsOptional()
  birthdate!: Date;

  @IsOptional()
  password!: string;

  @IsOptional()
  profileImageUrl!: string;

  @IsOptional()
  bio!: string;

  @IsOptional()
  gender!: Gender;
}