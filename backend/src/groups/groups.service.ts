import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { DeleteResult, In, ObjectID } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Group } from './groups.entity';
import { CreateGroupDto, CreateGroupsDto } from '@rmtd/common/dtos';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  findById(id: number): Promise<Group> {
    return this.groupRepository.findOne({ where: { id } });
  }

  async createGroups(data: CreateGroupsDto): Promise<Group[]> {
    const groups = [];
    for (const groupData of data.items) {
      const group: CreateGroupDto = groupData;
      groups.push({ ...group });
    }
    return await this.groupRepository.save(groups);
  }
}
