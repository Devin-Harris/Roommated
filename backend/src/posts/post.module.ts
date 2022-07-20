import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from 'src/groups/groups.module';
import { GroupsService } from 'src/groups/groups.service';
import { CloudinaryModule } from 'src/providers/cloudinary/cloudinary.module';
import { Attachment } from './attachments/attachment.entity';
import { Location } from './locations/location.entity';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([Post, Location, Attachment]),
    forwardRef(() => GroupsModule),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
