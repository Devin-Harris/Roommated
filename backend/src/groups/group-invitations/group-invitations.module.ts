import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUsersController } from '../group-users/group-users.controller';
import { GroupUser } from '../group-users/group-users.entity';
import { GroupUsersModule } from '../group-users/group-users.module';
import { GroupUsersService } from '../group-users/group-users.service';
import { GroupInvitationsController } from './group-invitations.controller';
import { GroupInvitation } from './group-invitations.entity';
import { GroupInvitationsService } from './group-invitations.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupInvitation, GroupUser]), GroupUsersModule],
  providers: [GroupInvitationsService, GroupUsersService],
  controllers: [GroupInvitationsController, GroupUsersController],
})
export class GroupInvitationsModule {}
