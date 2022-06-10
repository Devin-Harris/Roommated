import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupInvitationsModule } from './group invitations/group-invitations.module';
import { GroupUsersModule } from './group users/groups.module';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './groups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), GroupInvitationsModule, GroupUsersModule],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
