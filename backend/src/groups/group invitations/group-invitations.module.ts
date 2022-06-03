import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupInvitation } from './group-invitations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupInvitation])],
  // providers: [GroupInvitationsService],
  // controllers: [GroupInvitationsController],
})
export class GroupInvitationsModule {}
