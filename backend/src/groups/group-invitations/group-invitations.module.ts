import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupInvitationsController } from './group-invitations.controller';
import { GroupInvitation } from './group-invitations.entity';
import { GroupInvitationsService } from './group-invitations.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupInvitation])],
  providers: [GroupInvitationsService],
  controllers: [GroupInvitationsController],
})
export class GroupInvitationsModule {}
