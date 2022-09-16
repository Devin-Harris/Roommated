import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateApplicationDto,
  ResponseApplicationDto,
  UpdateApplicationDto,
} from '@rmtd/common/dtos';
import { DeleteResult, Repository } from 'typeorm';
import { Application } from './application.entity';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { GroupInvitationState } from '@rmtd/common/enums';
import { GroupUsersService } from 'src/groups/group-users/group-users.service';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private groupUserService: GroupUsersService,
    private groupsService: GroupsService,
  ) {}

  /**
   * Creates a new post application and saves it to the repository
   * @param data the CreateApplicationDto to use
   * @returns the newly created Application entity from the database
   */
  async createApplication(data: CreateApplicationDto): Promise<Application> {
    const created = await this.applicationRepository.save(data);
    return this.applicationRepository.findOne({
      relations: {
        post: true,
        applicantUser: true,
        applicantGroup: true,
      },
      where: {
        id: created.id,
      },
    });
  }

  /**
   * Sets values for the post application with matching id to specified data
   * @param data the UpdateApplicationDto to use
   * @returns the updated Application entity from the database
   */
  async updateApplicationById(data: UpdateApplicationDto): Promise<Application> {
    await this.applicationRepository.update(
      { id: data.id },
      { comment: data.comment, state: data.state },
    );
    return this.applicationRepository.findOne({
      relations: {
        post: true,
        applicantUser: true,
        applicantGroup: true,
      },
      where: {
        id: data.id,
      },
    });
  }

  /**
   * Deletes the post application(s) whose ids match those provided
   * @param ids object specifiying id values to delete by (conditional AND)
   * @returns the DeleteResult of deletion
   */
  async deleteApplicationsByIds(ids: {
    id?: number;
    postId?: number;
    applicantUserId?: number;
    applicantGroupId?: number;
  }): Promise<DeleteResult> {
    return this.applicationRepository.createQueryBuilder().delete().where(ids).execute();
  }

  async findApplicationsById(id: number): Promise<Application> {
    return this.applicationRepository.findOne({
      relations: {
        applicantUser: true,
      },
      where: { id },
    });
  }

  /**
   * Finds the post application(s) whose ids match those provided
   * @param ids object specifiying id values to find (conditional AND)
   * @returns an array of all matching Application entities
   */
  async findApplicationsByIds(ids: {
    id?: number;
    postId?: number;
    applicantUserId?: number;
    applicantGroupId?: number;
  }): Promise<Application[]> {
    return this.applicationRepository.find({
      relations: {
        post: true,
        applicantUser: true,
        applicantGroup: true,
      },
      where: ids,
    });
  }

  /**
   * Finds the post application(s) whose ids match those provided
   * @param ids object specifiying id values to find (conditional OR)
   * @returns an array of all matching Application entities
   */
  async findApplicationsByIds_OR(ids: {
    id?: number;
    postId?: number;
    applicantUserId?: number;
    applicantGroupId?: number;
  }): Promise<Application[]> {
    const findOptions = [];
    for (const [key, value] of Object.entries(ids)) {
      const option = {};
      option[key] = value;
      findOptions.push(option);
    }
    return this.applicationRepository.find({
      relations: {
        post: true,
        applicantUser: true,
        applicantGroup: true,
      },
      where: findOptions,
    });
  }

  /**
   * Finds all applications whose post belongs to a given group
   * @param groupId the groupId of the group that made some post
   * @returns an array of applications that apply to said post
   */
  async incomingApplications(groupId: number): Promise<Application[]> {
    return this.applicationRepository.find({
      relations: {
        post: true,
        applicantUser: true,
        applicantGroup: true,
      },
      where: {
        post: {
          groupId: groupId,
        },
      },
    });
  }

  denyApplicationById(id: number) {
    return this.applicationRepository.update({ id }, { state: GroupInvitationState.Declined });
  }

  async acceptApplicationById(id: number, applicant: Application, req) {
    await this.groupUserService.transferGroupUsers(applicant.applicantGroupId, req.user.groupId);
    await this.groupsService.deleteById(applicant.applicantGroupId);
    return this.applicationRepository.update({ id }, { state: GroupInvitationState.Accepted });
  }

  mapApplicationsToResponseDto(applications: Application[]): ResponseApplicationDto[] {
    return applications.map((application: Application) =>
      this.mapApplicationToResponseDto(application),
    );
  }

  mapApplicationToResponseDto(application: Application): ResponseApplicationDto {
    return plainToClass(ResponseApplicationDto, instanceToPlain(application), {
      excludeExtraneousValues: true,
    });
  }
}
