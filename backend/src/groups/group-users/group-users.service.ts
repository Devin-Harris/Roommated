import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { GroupUser } from './group-users.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Injectable()
export class GroupUsersService {
  constructor(
    @InjectRepository(GroupUser)
    private groupUsersRepository: Repository<GroupUser>,
    private usersService: UsersService,
  ) {}

  async findUsersByGroupId(id: number): Promise<User[]> {
    const userIds = await this.groupUsersRepository
      .find({
        select: { userId: true },
        where: {
          groupId: id,
        },
      })
      .then((users) => {
        return users.map((u) => u.userId);
      });
    return this.usersService.findByIds(userIds);
  }
}
