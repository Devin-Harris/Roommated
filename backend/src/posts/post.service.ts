import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { Location } from 'src/posts/locations/location.entity';
import { CreatePostDto } from '@rmtd/common/dtos';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createPostDto: CreatePostDto, groupId: number) {
    // Create location object
    const location = this.locationRepository.create(createPostDto.location);
    await this.locationRepository.save(location);

    // Use the location object to create the post
    const post = this.postRepository.create({
      ...createPostDto,
      location: location,
      groupId: groupId,
    });
    return await this.postRepository.save(post);
  }

  findAll() {
    return `This action returns all post`;
  }

  findByPostId(id: number) {
    return `This action returns a #${id} post`;
  }

  async findByGroupId(groupId: number) {
    const post = await this.postRepository.findOne({ where: { groupId: groupId } });
    return post;
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

