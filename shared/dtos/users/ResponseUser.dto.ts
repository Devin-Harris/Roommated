import { BaseUserDto } from './BaseUser.dto';
import { Expose, Exclude, Type } from 'class-transformer';
import { AuthenticatedUser, User } from './../../interfaces';

export class ResponseUserDto extends BaseUserDto {
  @Expose()
  id!: number;

  @Exclude()
  override password!: string;
}

export class ResponseAuthenticatedUserDto implements AuthenticatedUser {
  @Expose()
  @Type(() => ResponseUserDto)
  user!: User;

  @Expose()
  access_token!: string;
}
