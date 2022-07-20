import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from 'src/groups/groups.module';
import { GroupsService } from 'src/groups/groups.service';
import { LocationsModule } from 'src/posts/locations/locations.module';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), LocationsModule, forwardRef(() => GroupsModule)],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
