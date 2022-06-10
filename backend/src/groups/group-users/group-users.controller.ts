import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GroupUsersService } from './group-users.service';

@Controller('/groupusers')
export class GroupUsersController {
  constructor(
    private readonly groupUsersService: GroupUsersService,
    private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: number) {
    const users = await this.groupUsersService.findUsersByGroupId(id);
    return this.usersService.mapUsersToResponseDto(users);
  }
}
