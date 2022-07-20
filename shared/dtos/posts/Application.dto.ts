import { Application, Group, Post, User } from '../../interfaces';
import { Expose, Exclude, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { GroupInvitationState } from '../../enums';
import { ResponseUserDto } from '../users';
import { ResponsePostDto } from './Post.dto';
import { ResponseGroupDto } from '../groups';

export class BaseApplicationDto implements Application {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  postId: number;

  @IsNotEmpty()
  @Type((post) => ResponsePostDto)
  @Expose()
  post: Post;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  applicantUserId: number;

  @IsNotEmpty()
  @Type((applicantUser) => ResponseUserDto)
  @Expose()
  applicantUser: User;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  applicantGroupId: number;

  @IsNotEmpty()
  @Type((applicantGroup) => ResponseGroupDto)
  @Expose()
  applicantGroup: Group;

  @IsOptional()
  @IsString()
  @Expose()
  comment?: string;

  @IsNotEmpty()
  @IsEnum(GroupInvitationState)
  @Expose()
  state: GroupInvitationState;
}

export class CreateApplicationDto implements Partial<Application> {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  postId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  applicantUserId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  applicantGroupId: number;

  @IsOptional()
  @IsString()
  @Expose()
  comment?: string;
}

export class UpdateApplicationDto implements Partial<Application> {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id: number;

  @IsOptional()
  @IsString()
  @Expose()
  comment: string;

  @IsOptional()
  @IsEnum(GroupInvitationState)
  @Expose()
  state: GroupInvitationState;
}

export class ResponseApplicationDto extends BaseApplicationDto {
  @Exclude()
  override postId: number;

  @Exclude()
  override applicantUser: User;

  @Exclude()
  override applicantGroupId: number;
}
