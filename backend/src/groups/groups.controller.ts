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
  ResponseGroupDto,
} from '@rmtd/common/dtos';
import { GroupsService } from './groups.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get(':id')
  @ApiOkResponse({ type: ResponseGroupDto })
  @ApiNotFoundResponse()
  async findById(@Param('id') id: number): Promise<ResponseGroupDto> {
    const group = await this.groupsService.findById(id);
    if (group) return this.groupsService.mapGroupToResponseDto(group);
    throw new NotFoundException();
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
