import { Controller, Get, Param } from '@nestjs/common';
import { GroupUsersService } from './group-users.service';

@Controller('/groupusers')
export class GroupUsersController {
  constructor(private readonly groupUsersService: GroupUsersService) {}

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.groupUsersService.getUsers(id);
  }
}
