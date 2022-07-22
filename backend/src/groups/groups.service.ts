import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { DeleteResult, In } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Group } from './groups.entity';
import {
  CreateGroupsDto,
  UpdateGroupDto,
  UpdateGroupsDto,
  ResponseGroupDto,
  UpdateGroupPayloadDto,
  CreateGroupDto,
} from '@rmtd/common/dtos';
import { GroupUsersService } from './group-users/group-users.service';
import { GroupInvitationsService } from './group-invitations/group-invitations.service';
import { User } from 'src/users/users.entity';
import { GroupUserRole } from '@rmtd/common/enums';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private groupUserService: GroupUsersService,
    private groupInvitationService: GroupInvitationsService,
  ) {}

  findByIds(ids: number[]): Promise<Group[]> {
    return this.groupRepository.find({
      where: { id: In(ids) },
      relations: [
        'groupUsers',
        'groupUsers.user',
        'groupInvitations',
        'groupInvitations.receivingUser',
      ],
    });
  }

  findById(id: number): Promise<Group> {
    return this.groupRepository.findOne({
      where: { id },
      relations: [
        'groupUsers',
        'groupUsers.user',
        'groupInvitations',
        'groupInvitations.receivingUser',
        'post',
        'post.applications',
        'sentApplications',
      ],
    });
  }

  async findByUserId(userId: number): Promise<Group> {
    const groupUser = await this.groupUserService.findGroupByUserId(userId);
    if (!groupUser || !groupUser.groupId) {
      throw new NotFoundException('Could not find group for given user');
    }
    return this.findById(groupUser.groupId);
  }

  async createGroup(groupData: CreateGroupDto, createUser: User): Promise<Group> {
    // Create new group
    const group = await this.groupRepository.save({
      ...groupData,
      createUserId: createUser.id,
      updateUserId: createUser.id,
    });

    // Remove any group user with owner as userId if one exists
    await this.groupUserService.removeByUserIdIfExists(createUser.id);
    // Create new group user with owner as createUser
    await this.groupUserService.createGroupUser(createUser.id, group.id, GroupUserRole.Owner);

    return this.findById(group.id);
  }

  async updateByIds(data: UpdateGroupsDto): Promise<Group[]> {
    return this.groupRepository.save([...data.items]);
  }

  async updateById(group: UpdateGroupDto): Promise<Group> {
    return this.groupRepository.save({ ...group });
  }

  async update(payload: UpdateGroupPayloadDto): Promise<Group> {
    const userIdsToRemove = payload.userIdsToRemove ?? [];
    const userIdsToDemote = payload.userIdsToDemote ?? [];
    const userIdsToPromote = payload.userIdsToPromote ?? [];
    const invitationIdsToRemove = payload.invitationIdsToRemove ?? [];

    await this.groupUserService.removeByUserIds(userIdsToRemove);
    await this.groupUserService.demoteGroupUsers(userIdsToDemote);
    await this.groupUserService.promoteGroupUsers(userIdsToPromote);
    await this.groupInvitationService.deleteInvitationsByIds(invitationIdsToRemove);
    await this.groupRepository.save({ ...payload.mutatedGroup });

    return this.findById(payload.mutatedGroup.id);
  }

  async deleteByIds(groupIds: number[]): Promise<DeleteResult> {
    return this.groupRepository.delete({ id: In(groupIds) });
  }

  async deleteById(groupId: number): Promise<DeleteResult> {
    return this.groupRepository.delete({ id: groupId });
  }

  mapGroupsToResponseDto(groups: Group[]): ResponseGroupDto[] {
    return groups.map((group: Group) => this.mapGroupToResponseDto(group));
  }

  mapGroupToResponseDto(group: Group): ResponseGroupDto {
    return plainToClass(ResponseGroupDto, instanceToPlain(group), {
      excludeExtraneousValues: true,
    });
  }
}
