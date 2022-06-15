import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupInvitationsModule } from './group invitations/group-invitations.module';
import { GroupUsersModule } from './group-users/group-users.module';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './groups.entity';
import { GroupUsersController } from './group-users/group-users.controller';
import { GroupUsersService } from './group-users/group-users.service';
import { GroupUser } from './group-users/group-users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupUser]),
    GroupInvitationsModule,
    GroupUsersModule,
    UsersModule,
  ],
  providers: [GroupsService, GroupUsersService],
  controllers: [GroupUsersController, GroupsController],
})
export class GroupsModule {}
