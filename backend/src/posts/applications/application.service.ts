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
      comment: data.comment,
      state: GroupInvitationState.Pending,
    };

    const createdApplication = await this.applicationRepository.save(application);
    return this.findApplicationById(createdApplication.id);
  }

  async updateApplicationById(application: UpdateApplicationDto): Promise<Application> {
    await this.applicationRepository.save(application);
    return this.findApplicationById(application.id);
  }

  async deleteApplicationById(applicationId: number): Promise<DeleteResult> {
    return this.applicationRepository.delete({ id: applicationId });
  }

  async deleteApplicationsByUserId(userId: number): Promise<DeleteResult> {
    return this.applicationRepository.delete({ applicantUserId: userId });
  }

  async deleteApplicationsByPostId(postId: number): Promise<DeleteResult> {
    return this.applicationRepository.delete({ postId: postId });
  }

  async findApplicationById(applicationId: number): Promise<Application> {
    return this.applicationRepository.findOne({
      where: {
        id: applicationId,
      },
      relations: ['applicantUser', 'post'],
    });
  }

  async findApplicationsByUserId(userId: number): Promise<Application[]> {
    return this.applicationRepository.find({
      where: {
        applicantUserId: userId,
      },
      relations: ['applicantUser', 'post'],
    });
  }

  async findApplicationsByPostId(postId: number): Promise<Application[]> {
    return this.applicationRepository.find({
      where: {
        postId: postId,
      },
      relations: ['applicantUser', 'post'],
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
