import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from 'src/groups/group-users/group-users.entity';
import { GroupUsersModule } from 'src/groups/group-users/group-users.module';
import { GroupUsersService } from 'src/groups/group-users/group-users.service';
import { Group } from 'src/groups/groups.entity';
import { GroupsModule } from 'src/groups/groups.module';
import { GroupsService } from 'src/groups/groups.service';
import { ApplicationController } from './application.controller';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, GroupUser, Group]),
    GroupsModule,
    GroupUsersModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, GroupUsersService, GroupsService],
  exports: [ApplicationService, GroupUsersService, GroupsService],
})
export class ApplicationModule {}
