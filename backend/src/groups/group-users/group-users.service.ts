import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { GroupUser } from './group-users.entity';
import { ResponseGroupUserDto } from '@rmtd/common/dtos';
import { DeleteResult, In, Not, UpdateResult } from 'typeorm';
import { GroupUserRole } from '@rmtd/common/enums';
import { group } from 'console';

@Injectable()
export class GroupUsersService {
  constructor(
    @InjectRepository(GroupUser)
    private groupUsersRepository: Repository<GroupUser>,
  ) {}

  async findUsersByGroupId(groupId: number): Promise<ResponseGroupUserDto[]> {
    return this.groupUsersRepository.find({
      where: {
        groupId,
      },
      relations: ['user'],
    });
  }

  async findGroupByUserId(userId: number): Promise<ResponseGroupUserDto> {
    return this.groupUsersRepository.findOne({
      where: {
        userId,
      },
    });
  }

  async createGroupUser(userId: number, groupId: number): Promise<ResponseGroupUserDto> {
    console.log(userId, groupId);
    return this.groupUsersRepository.save({
      userId,
      groupId,
      groupRole: GroupUserRole.Member,
    });
  }

  async removeByUserIds(userIds: number[]): Promise<DeleteResult> {
    const groupUsers = await this.groupUsersRepository.find({
      where: {
        userId: In(userIds),
      },
    });
    if (groupUsers.some((groupUser) => groupUser.groupRole === GroupUserRole.Owner)) {
      throw new BadRequestException('Cannot remove a group user that is the owner');
    }

    return this.groupUsersRepository.delete({
      userId: In(userIds),
      groupRole: Not(GroupUserRole.Owner),
    });
  }

  async removeByUserIdIfExists(userId: number): Promise<null | DeleteResult> {
    const groupUser = await this.groupUsersRepository.findOne({
      where: {
        userId,
      },
    });
    if (groupUser) {
      if (groupUser.groupRole === GroupUserRole.Owner) {
        throw new BadRequestException('Cannot remove the owner of a group');
      }
      return this.groupUsersRepository.delete({
        userId,
        groupRole: Not(GroupUserRole.Owner),
      });
    }
    return null;
  }

  async promoteGroupUsers(groupUserIds): Promise<UpdateResult> {
    return this.groupUsersRepository.update(
      { userId: In(groupUserIds), groupRole: Not(GroupUserRole.Owner) },
      { groupRole: GroupUserRole.Admin },
    );
  }

  async demoteGroupUsers(groupUserIds): Promise<UpdateResult> {
    return this.groupUsersRepository.update(
      { userId: In(groupUserIds), groupRole: Not(GroupUserRole.Owner) },
      { groupRole: GroupUserRole.Member },
    );
  }
}
