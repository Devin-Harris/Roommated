import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from './group-users.entity';
import { GroupUsersController } from './group-users.controller';
import { GroupUsersService } from './group-users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([GroupUser]), UsersModule],
  providers: [GroupUsersService],
  controllers: [GroupUsersController],
})
export class GroupUsersModule {}
