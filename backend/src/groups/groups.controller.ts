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
import {
  CreateGroupsDto,
  UpdateGroupDto,
  UpdateGroupsDto,
  ResponseGroupDto,
  ResponseUserDto,
} from '@rmtd/common/dtos';
import { GroupsService } from './groups.service';
import { GroupUsersService } from './group-users/group-users.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly usersService: UsersService,
    private readonly groupUsersService: GroupUsersService,
  ) {}

  @Get()
  @ApiOkResponse({ type: ResponseGroupDto, isArray: true })
  @ApiNotFoundResponse()
  async findByIds(@Query('ids') idsString: string): Promise<ResponseGroupDto[]> {
    const ids = idsString.split(',').map((id) => parseInt(id));
    const groups = await this.groupsService.findByIds(ids);

    if (groups.length < ids.length) {
      const notFoundIds = [];
      ids.forEach((id) => {
        if (!groups.some((group) => group.id === id)) {
          notFoundIds.push(id);
        }
      });
      throw new NotFoundException(`Could not find users with the ids: ${notFoundIds}`);
    }

    return this.groupsService.mapGroupsToResponseDto(groups);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseGroupDto })
  @ApiNotFoundResponse()
  async findById(@Param('id') id: number): Promise<ResponseGroupDto> {
    const group = await this.groupsService.findById(id);
    if (group) return this.groupsService.mapGroupToResponseDto(group);
    throw new NotFoundException();
  }

  @Get(':id/users')
  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  @ApiNotFoundResponse()
  async getGroupUsers(@Param('id') id: number): Promise<ResponseUserDto[]> {
    const userList = await this.groupUsersService.findUsersByGroupId(id);
    if (userList) return this.usersService.mapUsersToResponseDto(userList);
  }

  @Post()
  @ApiOkResponse({ type: ResponseGroupDto, isArray: true })
  async makeGroups(@Body() body: CreateGroupsDto): Promise<ResponseGroupDto[]> {
    const groups = await this.groupsService.createGroups(body);
    return this.groupsService.mapGroupsToResponseDto(groups);
  }

  @Put()
  @ApiOkResponse({ type: ResponseGroupDto, isArray: true })
  @ApiNotFoundResponse()
  async updateGroups(@Body() body: UpdateGroupsDto): Promise<ResponseGroupDto[]> {
    const groups = await this.groupsService.updateByIds(body);
    return this.groupsService.mapGroupsToResponseDto(groups);
  }

  @Put()
  @ApiOkResponse({ type: ResponseGroupDto })
  @ApiNotFoundResponse()
  async updateGroup(@Body() body: UpdateGroupDto): Promise<ResponseGroupDto> {
    const group = await this.groupsService.updateById(body);
    return this.groupsService.mapGroupToResponseDto(group);
  }

  @Delete()
  @ApiOkResponse({ type: DeleteResult })
  @ApiNotFoundResponse()
  async deleteByIds(@Query('ids') idsString: string): Promise<DeleteResult> {
    const ids = idsString.split(',').map((id) => parseInt(id));
    return await this.groupsService.deleteByIds(ids);
  }

  @Delete()
  @ApiOkResponse({ type: DeleteResult })
  @ApiNotFoundResponse()
  async deleteById(@Param('id') id: number): Promise<DeleteResult> {
    return await this.groupsService.deleteById(id);
  }
}