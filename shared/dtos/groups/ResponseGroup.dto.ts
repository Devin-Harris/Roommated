import { BaseGroupDto } from './BaseGroup.dto';
import { Expose, Type } from 'class-transformer';
import { ResponseGroupUserDto } from './groupusers';
import { ResponseGroupInvitationDto } from './groupinvitations';
export class ResponseGroupDto extends BaseGroupDto {
  @Expose()
  id!: number;

  @Type((groupUsers) => ResponseGroupUserDto)
  @Expose()
  override groupUsers!: ResponseGroupUserDto[];

  @Type((groupInvitations) => ResponseGroupInvitationDto)
  @Expose()
  override groupInvitations!: ResponseGroupInvitationDto[];
}
