import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseGroupInvitationDto } from '@rmtd/common/dtos';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { DeleteResult, In } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { GroupInvitation } from './group-invitations.entity';

@Injectable()
export class GroupInvitationsService {
  constructor(
    @InjectRepository(GroupInvitation)
    private groupInvitationRepository: Repository<GroupInvitation>,
  ) {}

  findByIds(ids: number[]): Promise<GroupInvitation[]> {
    return this.groupInvitationRepository.find({
      where: { id: In(ids) },
      relations: ['group', 'receivingUser'],
    });
  }

  findInvitationsByGroupId(groupId: number): Promise<ResponseGroupInvitationDto[]> {
    return this.groupInvitationRepository.find({
      where: { groupId },
      relations: ['group', 'receivingUser'],
    });
  }

  findInvitationsByUserId(userId: number): Promise<ResponseGroupInvitationDto[]> {
    return this.groupInvitationRepository.find({
      where: { receivingUserId: userId },
      relations: ['group', 'receivingUser'],
    });
  }

  deleteInvitationsByIds(invitationIds: number[]): Promise<DeleteResult> {
    return this.groupInvitationRepository.delete({
      id: In(invitationIds),
    });
  }

  mapInvitationsToResponseDto(invitations: GroupInvitation[]): ResponseGroupInvitationDto[] {
    return invitations.map((invitation: GroupInvitation) =>
      this.mapInvitationToResponseDto(invitation),
    );
  }

  mapInvitationToResponseDto(invitation: GroupInvitation): ResponseGroupInvitationDto {
    return plainToClass(ResponseGroupInvitationDto, instanceToPlain(invitation), {
      excludeExtraneousValues: true,
    });
  }
}
