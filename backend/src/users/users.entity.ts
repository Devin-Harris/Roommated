import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '@rmtd/common/enums';
import { User as IUser } from '@rmtd/common/interfaces';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column()
  password: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ nullable: true })
  bio: string;

  @Column()
  gender: Gender;

  /*
    isAdmin property should only be set through manually interacting with the database
    a new user should not be able to be created with this field as true through the users controller
  */
  @Column({ default: false })
  isAdmin: boolean;
}

export class UserDto implements IUser {
  @IsNotEmpty()
  @IsString()
  @Expose()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @IsOptional()
  @IsMobilePhone()
  @Expose()
  phone: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  birthdate: Date;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @Expose()
  profileImageUrl: string;

  @IsOptional()
  @IsString()
  @Expose()
  bio: string;

  @IsEnum(Gender)
  @Expose()
  gender: Gender;
}

export class CreateUsersDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  items: CreateUserDto[];
}

export class CreateUserDto extends UserDto {}

export class UpdateUsersDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserDto)
  items: UpdateUserDto[];
}

export class UpdateUserDto extends UserDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  firstname: string;

  @IsOptional()
  lastname: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  birthdate: Date;

  @IsOptional()
  password: string;

  @IsOptional()
  profileImageUrl: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  gender: Gender;
}

export class UserResponseDto extends UserDto {
  @Expose()
  id: number;

  @Exclude()
  password: string;
}
