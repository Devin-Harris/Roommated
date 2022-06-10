import { BaseGroupDto } from './BaseGroup.dto';
import { Expose } from 'class-transformer';

export class ResponseGroupDto extends BaseGroupDto {
  @Expose()
  id!: number;
}
