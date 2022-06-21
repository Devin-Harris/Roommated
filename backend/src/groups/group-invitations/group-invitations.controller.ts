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
import { ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import {
  ResponseGroupInvitationDto,
  CreateGroupInvitationDto,
  AcceptGroupInvitationDto,
} from '@rmtd/common/dtos';
import { DeleteResult } from 'typeorm';
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

  @Post()
  async createInvitations(
    @Body() body: CreateGroupInvitationDto,
  ): Promise<ResponseGroupInvitationDto[]> {
    return this.groupInvitationsService.createInvitations(body);
  }

  @Put(':id/decline')
  @ApiParam({ name: 'id', description: 'Invitation id' })
  async declineInvitation(@Param('id') id: number): Promise<DeleteResult> {
    return this.groupInvitationsService.declineInvitationById(id);
  }

  @Put(':id/accept')
  @ApiParam({ name: 'id', description: 'Invitation id' })
  async acceptInvitation(
    @Param('id') id: number,
    @Body() body: AcceptGroupInvitationDto,
  ): Promise<DeleteResult> {
    return this.groupInvitationsService.acceptInvitationById(id, body);
  }
}
