import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';
import {
  CreateUserDto,
  CreateUsersDto,
  UpdateUserDto,
  UpdateUsersDto,
  User,
  UserResponseDto,
} from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findByIds(@Query('ids') idsString: string): Promise<UserResponseDto[]> {
    const ids = idsString.split(',').map((id) => parseInt(id));
    const users = await this.userService.findByIds(ids);

    if (users.length < ids.length) {
      const notFoundIds = [];
      ids.forEach((id) => {
        if (!users.some((user) => user.id === id)) {
          notFoundIds.push(id);
        }
      });
      throw new NotFoundException(
        `Could not find users with the ids: ${notFoundIds}`,
      );
    }

    return this.userService.mapUsersToResponseDto(users);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);

    if (user) return this.userService.mapUserToResponseDto(user);

    throw new NotFoundException();
  }

  @Post()
  async makeUsers(@Body() body: CreateUsersDto): Promise<UserResponseDto[]> {
    const users = await this.userService.createUsers(body);
    return this.userService.mapUsersToResponseDto(users);
  }

  @Put()
  async updateByIds(@Body() body: UpdateUsersDto): Promise<UserResponseDto[]> {
    const users = await this.userService.updateByIds(body);
    return this.userService.mapUsersToResponseDto(users);
  }

  @Put(':id')
  async updateById(@Body() body: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.updateById(body);
    return this.userService.mapUserToResponseDto(user);
  }

  @Delete()
  async deleteByIds(@Query('ids') idsString: string): Promise<DeleteResult> {
    const ids = idsString.split(',').map((id) => parseInt(id));
    return await this.userService.deleteByIds(ids);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.deleteById(id);
  }
}
