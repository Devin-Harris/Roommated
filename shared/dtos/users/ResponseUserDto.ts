import { BaseUserDto } from "./BaseUserDto";
import { Expose, Exclude } from 'class-transformer';

export class UserResponseDto extends BaseUserDto {
  @Expose()
  id!: number;

  @Exclude()
  password!: string;
}