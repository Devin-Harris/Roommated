import { BaseGroupDto } from './BaseGroup.dto';
import { Expose, Type } from 'class-transformer';
import { ResponseGroupUserDto } from './groupusers';
export class ResponseGroupDto extends BaseGroupDto {
  @Expose()
  id!: number;

  @Type((groupUsers) => ResponseGroupUserDto)
  @Expose()
  override groupUsers!: ResponseGroupUserDto[];
}
