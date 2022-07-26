import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUsersModule } from 'src/groups/group-users/group-users.module';
import { GroupsModule } from 'src/groups/groups.module';
import { ApplicationController } from './application.controller';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), GroupsModule, GroupUsersModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],

})
export class ApplicationModule {}
