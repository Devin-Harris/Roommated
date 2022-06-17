import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { ResponseGroupUserDto } from '@rmtd/common/dtos';
import { GroupUsersService } from './group-users.service';

@Controller('/groupusers')
export class GroupUsersController {
  constructor(private readonly groupUsersService: GroupUsersService) {}

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Group id' })
  async findById(@Param('id') id: number): Promise<ResponseGroupUserDto[]> {
    return this.groupUsersService.findUsersByGroupId(id);
  }
}
