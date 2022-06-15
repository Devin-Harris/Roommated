import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';
import { DeleteResult, In } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Group } from './groups.entity';
import {
  CreateGroupsDto,
  UpdateGroupDto,
  UpdateGroupsDto,
  ResponseGroupDto,
} from '@rmtd/common/dtos';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  findByIds(ids: number[]): Promise<Group[]> {
    return this.groupRepository.find({
      where: { id: In(ids) },
      relations: ['groupUsers', 'groupUsers.user'],
    });
  }

  findById(id: number): Promise<Group> {
    return this.groupRepository.findOne({
      where: { id },
      relations: ['groupUsers', 'groupUsers.user'],
    });
  }

  async createGroups(data: CreateGroupsDto): Promise<Group[]> {
    return await this.groupRepository.save([...data.items]);
  }

  async updateByIds(data: UpdateGroupsDto): Promise<Group[]> {
    return this.groupRepository.save([...data.items]);
  }

  async updateById(group: UpdateGroupDto): Promise<Group> {
    return this.groupRepository.save({ ...group });
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
