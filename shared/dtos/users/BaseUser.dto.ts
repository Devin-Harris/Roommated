import { Gender } from '../../enums';
import { User as IUser } from '../../interfaces';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class BaseUserDto implements IUser {
  @IsNotEmpty()
  @IsString()
  @Expose()
  firstname!: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  lastname!: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email!: string;

  @IsOptional()
  @IsMobilePhone()
  @Expose()
  phone?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  birthdate!: Date;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  @Expose()
  profileImageUrl?: string;

  @IsOptional()
  @IsString()
  @Expose()
  bio?: string;

  @IsEnum(Gender)
  @Expose()
  gender!: Gender;
}
