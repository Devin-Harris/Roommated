import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateApplicationDto,
  ResponseApplicationDto,
  UpdateApplicationDto,
} from '@rmtd/common/dtos';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { Application } from './application.entity';
import { GroupInvitationState } from '@rmtd/common/enums';
import { UsersService } from 'src/users/users.service';
import { instanceToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private usersService: UsersService,
  ) {}

  async createApplication(data: CreateApplicationDto): Promise<Application> {
    const application = {
      postId: data.postId,
      applicantUserId: data.applicantUserId,
      comment: data.comment,
      state: GroupInvitationState.Pending,
    };

    return this.applicationRepository.save(application);
  }

  async updateApplication(application: UpdateApplicationDto): Promise<Application> {
    await this.applicationRepository.save(application);
    return this.findApplicationById(application.id);
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
