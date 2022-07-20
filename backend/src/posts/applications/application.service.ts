import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateApplicationDto,
  ResponseApplicationDto,
  UpdateApplicationDto,
} from '@rmtd/common/dtos';
import { DeleteResult, Repository } from 'typeorm';
import { Application } from './application.entity';
import { instanceToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

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

  async updateApplicationById(application: UpdateApplicationDto): Promise<Application> {
    await this.applicationRepository.update(
      { id: application.id },
      { comment: application.comment, state: application.state },
    );
    return this.applicationRepository.findOne({
      relations: {
        post: true,
        applicantUser: true,
        applicantGroup: true,
      },
      where: {
        id: application.id,
      },
    });
  }

  async deleteApplicationsByIds(ids: {
    id?: number;
    postId?: number;
    applicantUserId?: number;
    applicantGroupId?: number;
  }): Promise<DeleteResult> {
    return this.applicationRepository.createQueryBuilder().delete().where(ids).execute();
  }

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
