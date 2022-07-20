import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
  UnauthorizedException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from '@rmtd/common/dtos';
import { Role } from 'src/authentication/roles/roles.decorator';
import { AuthRole } from '@rmtd/common/enums';
import { Post as IPost, PostFilter } from '@rmtd/common/interfaces';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Role(AuthRole.GroupOwner)
  @Post()
  @UseInterceptors(FilesInterceptor('attachments'))
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() request,
    @UploadedFiles() attachments: Array<Express.Multer.File>,
  ) {
    return this.postService.create(createPostDto, attachments, request.user.groupId);
  }

  @Get('me')
  findCurrent(@Req() request) {
    return this.postService.findByGroupId(request.user.groupId);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findByPostId(+id);
  }

  @Role(AuthRole.Public)
  @Put()
  async findByFilters(@Body() body: PostFilter): Promise<IPost[]> {
    const posts = this.postService.findByFilters(body);
    return posts;
  }

  @Role(AuthRole.GroupAdmin)
  @Put('me')
  update(@Body() updatePostDto: UpdatePostDto, @Req() request) {
    if (!request.user) {
      throw new UnauthorizedException();
    }
    return this.postService.update(request.user, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
