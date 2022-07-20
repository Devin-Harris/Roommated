import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateApplicationDto,
  ResponseApplicationDto,
  UpdateApplicationDto,
} from '@rmtd/common/dtos';
import { DeleteResult, Repository } from 'typeorm';
import { Application } from './application.entity';
import { GroupInvitationState } from '@rmtd/common/enums';
import { instanceToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async createApplication(data: CreateApplicationDto): Promise<Application> {
    const application = {
      postId: data.postId,
      applicantUserId: data.applicantUserId,
      applicantGroupId: data.applicantGroupId,
      comment: data.comment,
      state: GroupInvitationState.Pending,
    };

    const createdApplication = await this.applicationRepository.save(application);
    return this.findApplicationsByIds({ id: createdApplication.id })[0];
  }

  async updateApplicationById(application: UpdateApplicationDto): Promise<Application> {
    await this.applicationRepository.save(application);
    return this.findApplicationsByIds({ id: application.id })[0];
  }

  // async deleteApplicationByIds(ids: {
  //   applicationId?: number;
  //   postId?: number;
  //   userId?: number;
  //   groupId?: number;
  // }): Promise<DeleteResult> {
  //   return this.applicationRepository.delete({ id: applicationId });
  // }

  async findApplicationsByIds(ids: {
    id?: number;
    postId?: number;
    applicantUserId?: number;
    applicantGroupId?: number;
  }): Promise<Application[]> {
    return this.applicationRepository.find({
      where: ids,
      relations: ['post', 'applicantUser', 'applicantGroup'],
    });
  }

  async findApplicationsByIdsOr(ids: {
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
      where: findOptions,
      relations: ['post', 'applicantUser', 'applicantGroup'],
    });
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
