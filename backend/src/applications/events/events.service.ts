import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import { ApplicationService } from '../application.service';

@Injectable()
export class EventsService {
  constructor(private userService: UsersService, private applicationService: ApplicationService) {}

  async findUserInApplicationId(userId: number, applicationId: number): Promise<User | null> {
    const user = await this.userService.findById(userId);
    console.log(user);
    const application = await this.applicationService.findApplicationsById(applicationId);
    console.log(application);
    return null;
  }
}
