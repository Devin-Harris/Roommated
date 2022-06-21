import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AcceptGroupInvitationDto,
  BaseGroupDto,
  BaseGroupInvitationDto,
  CreateGroupInvitationDto,
  ResponseGroupInvitationDto,
} from '@rmtd/common/dtos';
import { GroupInvitationState } from '@rmtd/common/enums';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { DeleteResult, In } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { GroupInvitation } from './group-invitations.entity';
import { GroupInvitation as IGroupInvitation } from '@rmtd/common/interfaces';
import { GroupsService } from '../groups.service';
import { GroupUsersService } from '../group-users/group-users.service';

@Injectable()
export class GroupInvitationsService {
  constructor(
    @InjectRepository(GroupInvitation)
    private groupInvitationRepository: Repository<GroupInvitation>,
    private groupUserService: GroupUsersService,
  ) {}

  findByIds(ids: number[]): Promise<GroupInvitation[]> {
    return this.groupInvitationRepository.find({
      where: { id: In(ids) },
      relations: ['group', 'receivingUser'],
    });
  }

  findInvitationsByGroupId(groupId: number): Promise<ResponseGroupInvitationDto[]> {
    return this.groupInvitationRepository.find({
      where: { groupId },
      relations: ['group', 'receivingUser'],
    });
  }

  findInvitationsByUserId(userId: number): Promise<ResponseGroupInvitationDto[]> {
    return this.groupInvitationRepository.find({
      where: { receivingUserId: userId },
      relations: ['group', 'receivingUser'],
    });
  }

  deleteInvitationsByIds(invitationIds: number[]): Promise<DeleteResult> {
    return this.groupInvitationRepository.delete({
      id: In(invitationIds),
    });
  }

  createInvitations(data: CreateGroupInvitationDto): Promise<GroupInvitation[]> {
    const invitations: IGroupInvitation[] = [];
    for (let user of data.users) {
      invitations.push({
        groupId: data.groupId,
        receivingUserId: user.id,
        state: GroupInvitationState.Pending,
      });
    }

    return this.groupInvitationRepository.save(invitations);
  }

  declineInvitationById(id: number): Promise<DeleteResult> {
    return this.groupInvitationRepository.update({ id }, { state: GroupInvitationState.Declined });
  }

  async acceptInvitationById(id: number, data: AcceptGroupInvitationDto): Promise<DeleteResult> {
    // Remove old group user
    await this.groupUserService.removeByUserIdIfExists(data.user.id);
    // Get invitations group id
    const invitation = await this.groupInvitationRepository.findOne({ where: { id } });
    if (!invitation) {
      throw new BadGatewayException('No invitation was found');
    }
    // Add new group user
    await this.groupUserService.createGroupUser(data.user.id, invitation.groupId);
    // Mark invitation as accepted
    return this.groupInvitationRepository.update({ id }, { state: GroupInvitationState.Accepted });
  }

  mapInvitationsToResponseDto(invitations: GroupInvitation[]): ResponseGroupInvitationDto[] {
    return invitations.map((invitation: GroupInvitation) =>
      this.mapInvitationToResponseDto(invitation),
    );
  }

  mapInvitationToResponseDto(invitation: GroupInvitation): ResponseGroupInvitationDto {
    return plainToClass(ResponseGroupInvitationDto, instanceToPlain(invitation), {
      excludeExtraneousValues: true,
    });
  }
}
