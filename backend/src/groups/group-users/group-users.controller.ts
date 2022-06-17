import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { ResponseGroupUserDto } from '@rmtd/common/dtos';
import { DeleteResult } from 'typeorm';
import { GroupUsersService } from './group-users.service';

@Controller('/groupusers')
export class GroupUsersController {
  constructor(private readonly groupUsersService: GroupUsersService) {}

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Group id' })
  async findById(@Param('id') id: number): Promise<ResponseGroupUserDto[]> {
    return this.groupUsersService.findUsersByGroupId(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'User id' })
  async deleteByUserId(@Param('id') id: number): Promise<DeleteResult> {
    return this.groupUsersService.removeByUserIds([id]);
  }
}
