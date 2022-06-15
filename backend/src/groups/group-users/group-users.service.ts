import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { GroupUser } from './group-users.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { ResponseGroupUserDto, ResponseUserDto } from '@rmtd/common/dtos';

@Injectable()
export class GroupUsersService {
  constructor(
    @InjectRepository(GroupUser)
    private groupUsersRepository: Repository<GroupUser>,
    private usersService: UsersService,
  ) {}

  async findUsersByGroupId(id: number): Promise<ResponseGroupUserDto[]> {
    return this.groupUsersRepository.find({
      where: {
        groupId: id,
      },
      relations: ['user'],
    });
  }
}
