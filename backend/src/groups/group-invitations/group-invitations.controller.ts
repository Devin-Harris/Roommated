import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { ResponseGroupInvitationDto, CreateGroupInvitationDto } from '@rmtd/common/dtos';
import { GroupInvitationsService } from './group-invitations.service';

@Controller('groupinvitations')
export class GroupInvitationsController {
  constructor(private readonly groupInvitationsService: GroupInvitationsService) {}

  @Get()
  @ApiOkResponse({ type: ResponseGroupInvitationDto, isArray: true })
  @ApiNotFoundResponse()
  async findByIds(@Query('ids') idsString: string): Promise<ResponseGroupInvitationDto[]> {
    const ids = idsString.split(',').map((id) => parseInt(id));
    const invitations = await this.groupInvitationsService.findByIds(ids);

    if (invitations.length < ids.length) {
      const notFoundIds = [];
      ids.forEach((id) => {
        if (!invitations.some((invitation) => invitation.id === id)) {
          notFoundIds.push(id);
        }
      });
      throw new NotFoundException(`Could not find group invitations with the ids: ${notFoundIds}`);
    }

    return this.groupInvitationsService.mapInvitationsToResponseDto(invitations);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Group id' })
  async findById(@Param('id') id: number): Promise<ResponseGroupInvitationDto[]> {
    return this.groupInvitationsService.findInvitationsByGroupId(id);
  }

  @Get('/user/:id')
  @ApiParam({ name: 'id', description: 'User id' })
  async findByUserId(@Param('id') id: number): Promise<ResponseGroupInvitationDto[]> {
    return this.groupInvitationsService.findInvitationsByUserId(id);
  }

  @Post('')
  async createInvitations(
    @Body() body: CreateGroupInvitationDto,
  ): Promise<ResponseGroupInvitationDto[]> {
    return this.groupInvitationsService.createInvitations(body);
  }
}
