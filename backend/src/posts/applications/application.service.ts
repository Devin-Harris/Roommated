import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationDto } from '@rmtd/common/dtos';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { Application } from './application.entity';
import { Application as IApplication } from '@rmtd/common/interfaces';
import { GroupInvitationState } from '@rmtd/common/enums';
import { User } from 'src/users/users.entity';
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
    const post = this.postRepository.findOne({ where: { id: data.postId } });
    const user = this.usersService.findById(data.applicantUserId);
    const application = {
      postId: data.postId,
      applicantUserId: data.applicantUserId,
      comment: data.comment,
      state: GroupInvitationState.Pending,
    };

    return this.applicationRepository.save(application);
  }

  async findApplication(applicationId: number): Promise<Application> {
    return this.applicationRepository.findOne({
      where: {
        id: applicationId,
      },
    });
  }
}
