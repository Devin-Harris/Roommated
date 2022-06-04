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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult, ObjectID } from 'typeorm';
import {
  CreateUserDto,
  CreateUsersDto,
  UpdateUserDto,
  UpdateUsersDto,
  User,
} from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findByIds(@Query('ids') idsString: string): Promise<User[]> {
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

    return users;
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);

    if (user) return user;

    throw new NotFoundException();
  }

  @Post()
  async makeUsers(@Body() body: CreateUsersDto): Promise<User[]> {
    const users = await this.userService.createUsers(body);
    return users;
  }

  @Put()
  async updateByIds(@Body() body: UpdateUsersDto): Promise<User[]> {
    const users = await this.userService.updateByIds(body);
    return users;
  }

  @Put(':id')
  async updateById(@Body() body: UpdateUserDto): Promise<User> {
    const user = await this.userService.updateById(body);
    return user;
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
