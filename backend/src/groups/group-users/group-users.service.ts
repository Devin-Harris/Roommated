import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { GroupUser } from './group-users.entity';
import { ResponseGroupUserDto } from '@rmtd/common/dtos';
import { DeleteResult, In, Not, UpdateResult } from 'typeorm';
import { GroupUserRole } from '@rmtd/common/enums';

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

  async removeByUserIds(userIds: number[]): Promise<DeleteResult> {
    return this.groupUsersRepository.delete({
      userId: In(userIds),
      groupRole: Not(GroupUserRole.Owner),
    });
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
