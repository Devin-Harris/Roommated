import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseGroupDto, UpdateGroupPayloadDto, CreateGroupDto } from '@rmtd/common/dtos';
import { GroupsService } from './groups.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { Role } from 'src/authentication/roles/roles.decorator';
import { AuthRole } from '@rmtd/common/enums';
import { UsersService } from 'src/users/users.service';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/me')
  @ApiOkResponse({ type: ResponseGroupDto, isArray: true })
  @ApiNotFoundResponse()
  async findByUserId(@Req() req): Promise<ResponseGroupDto> {
    const group = await this.groupsService.findByUserId(req.user.id);
    return this.groupsService.mapGroupToResponseDto(group);
  }

  @Role(AuthRole.Public)
  @Get(':id')
  @ApiOkResponse({ type: ResponseGroupDto })
  @ApiNotFoundResponse()
  async findById(@Param('id') id: number): Promise<ResponseGroupDto> {
    const group = await this.groupsService.findById(id);
    if (group) return this.groupsService.mapGroupToResponseDto(group);
    throw new NotFoundException();
  }

  @Post('/me')
  @ApiOkResponse({ type: ResponseGroupDto, isArray: true })
  async makeGroups(@Body() body: CreateGroupDto, @Request() req: any): Promise<ResponseGroupDto> {
    const createUser = await this.usersService.findById(req.user.id);
    const group = await this.groupsService.createGroup(body, createUser);
    return this.groupsService.mapGroupToResponseDto(group);
  }

  @Role(AuthRole.GroupAdmin)
  @Put('/me')
  @ApiOkResponse({ type: ResponseGroupDto })
  @ApiNotFoundResponse()
  async updateGroupById(
    @Request() req,
    @Body() body: UpdateGroupPayloadDto,
  ): Promise<ResponseGroupDto> {
    const usersGroup = await this.groupsService.findByUserId(req.user.id);
    if (usersGroup.id != body.mutatedGroup.id) throw new UnauthorizedException();
    const group = await this.groupsService.update(body);
    return this.groupsService.mapGroupToResponseDto(group);
  }

  @Role(AuthRole.GroupOwner)
  @Delete('/me')
  @ApiOkResponse({ type: DeleteResult })
  @ApiNotFoundResponse()
  async deleteById(@Request() req): Promise<DeleteResult> {
    return await this.groupsService.deleteById(req.user.groupId);
  }
}
