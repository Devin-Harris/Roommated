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
  Res,
} from '@nestjs/common';
import {
  BaseGroupDto,
  CreateGroupDto,
  CreateGroupsDto,
  UpdateGroupDto,
  UpdateGroupsDto,
} from '@rmtd/common/dtos';
import { GroupsService } from './groups.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findById(@Param('id') id: number): Promise<BaseGroupDto> {
    const group = await this.groupsService.findById(id);
    if (group) return group;
    throw new NotFoundException();
  }

  @Post()
  async makeGroup(@Body() body: CreateGroupsDto): Promise<string> {
    const group = this.groupsService.createGroups(body);
    if (group) return 'success';
    return 'fail';
  }
}
