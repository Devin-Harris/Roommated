import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { Application } from '../application.entity';
import { ApplicationModule } from '../application.module';
import { ApplicationService } from '../application.service';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Application]),
    forwardRef(() => UsersModule),
    forwardRef(() => ApplicationModule),
  ],
  providers: [UsersService, ApplicationService, EventsService, EventsGateway],
  exports: [EventsGateway, EventsService],
})
export class EventsModule {}
