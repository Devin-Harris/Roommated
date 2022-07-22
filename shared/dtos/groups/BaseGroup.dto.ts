import { Group as IGroup } from '../../interfaces';
import { IsNumber, IsEnum, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';
import { Gender } from '../../enums';
import { ResponseGroupUserDto } from './groupusers';
import { ResponseGroupInvitationDto } from './groupinvitations';
import { ResponseApplicationDto, ResponsePostDto } from '../posts';

export class BaseGroupDto implements IGroup {
  @IsNotEmpty()
  @IsEnum(Gender)
  @Expose()
  gender!: Gender;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name!: string;

  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  showOnPosts!: boolean;

  groupUsers!: ResponseGroupUserDto[];

  groupInvitations!: ResponseGroupInvitationDto[];

  post!: ResponsePostDto;

  sentApplications!: ResponseApplicationDto[];
}
