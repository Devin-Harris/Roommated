import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from './group-users.entity';
import { GroupUsersController } from './group-users.controller';
import { GroupUsersService } from './group-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupUser])],
  providers: [GroupUsersService],
  controllers: [GroupUsersController],
  exports: [GroupUsersService],
})
export class GroupUsersModule {}
