import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationDto } from '@rmtd/common/dtos';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { Application } from './application.entity';
import { GroupInvitationState } from '@rmtd/common/enums';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private usersService: UsersService,
  ) {}

  async createApplication(data: ApplicationDto): Promise<Application> {
    const application = {
      postId: data.postId,
      applicantUserId: data.applicantUserId,
      comment: data.comment,
      state: GroupInvitationState.Pending,
    };

    return this.applicationRepository.save(application);
  }

  async findApplicationsByPostId(postId: number): Promise<Application[]> {
    return this.applicationRepository.find({
      where: {
        postId: postId,
      },
    });
  }

  async findApplicationById(applicationId: number): Promise<Application> {
    return this.applicationRepository.findOne({
      where: {
        id: applicationId,
      },
    });
  }
}
