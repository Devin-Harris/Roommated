import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from './group-users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupUser])],
  // providers: [GroupUsersService],
  // controllers: [GroupUsersController],
})
export class GroupUsersModule {}
