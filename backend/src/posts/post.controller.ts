import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '@rmtd/common/dtos';
import { Role } from 'src/authentication/roles/roles.decorator';
import { AuthRole } from '@rmtd/common/enums';
import { Post as IPost, PostFilter } from '@rmtd/common/interfaces';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() request) {
    return this.postService.create(createPostDto, request.user.groupId);
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postService.update(+id, updatePostDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
