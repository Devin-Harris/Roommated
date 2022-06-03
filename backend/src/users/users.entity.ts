import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '@rmtd/common/enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

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
}

export class CreateUsersDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  items: CreateUserDto[];
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsMobilePhone()
  phone: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profileImageUrl: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsEnum(Gender)
  gender: Gender;
}
