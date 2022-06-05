import { BaseUserDto } from "./BaseUser.dto";
import { Expose, Exclude } from "class-transformer";

export class ResponseUserDto extends BaseUserDto {
    @Expose()
    id!: number;

    @Exclude()
    override password!: string;
}
