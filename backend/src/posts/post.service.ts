import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Brackets, Repository } from 'typeorm';
import { Location } from 'src/posts/locations/location.entity';
import { CreatePostDto } from '@rmtd/common/dtos';
import {
  Gender,
  PostParkingFilter,
  PostPetFilter,
  PostState,
  PostTypeFilter,
} from '@rmtd/common/enums';
import { PostFilter } from '@rmtd/common/interfaces';

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

  async findByFilters(filters: PostFilter): Promise<Post[]> {
    const posts: Post[] = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.location', 'location')
      .leftJoinAndSelect('post.group', 'group')
      .leftJoinAndSelect('group.groupUsers', 'groupUsers')
      .where('post.state = :state', { state: PostState.Searching })
      .andWhere(this.getQBWhereConditions(filters))
      .getMany();

    return this.handleExtraneousFiltering(posts, filters);
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

  /**
   * Using this method do do filtering that was too complicated for my brain to do with the query builder
   * The groupsize filter definetly can not be done in there, because the alias's of the groupUsers relations
   * are done after the where condition executes, thus the query was failing when comparing the count of
   * group users that were selected: https://github.com/typeorm/typeorm/issues/764
   */
  private handleExtraneousFiltering(posts: Post[], filters: PostFilter) {
    return [...posts].filter((p) => {
      if (filters.minGroupSize && filters.maxGroupSize) {
        if (
          !(
            p.group.groupUsers.length >= filters.minGroupSize &&
            p.group.groupUsers.length <= filters.maxGroupSize
          )
        ) {
          return false;
        }
      } else if (filters.minGroupSize) {
        if (!(p.group.groupUsers.length >= filters.minGroupSize)) {
          return false;
        }
      } else if (filters.maxGroupSize) {
        if (!(p.group.groupUsers.length >= filters.minGroupSize)) {
          return false;
        }
      }

      if (filters.moveInDate) {
        if (
          !(
            new Date(p.leaseStart).getTime() <= new Date(filters.moveInDate).getTime() &&
            new Date(p.leaseEnd).getTime() >= new Date(filters.moveInDate).getTime()
          )
        ) {
          return false;
        }
      }

      if (filters.metersInView) {
        const kmInView = filters.metersInView / 1000;

        const lngDifInKm = Math.abs(filters.mapCenterLng - p.location.lng) * 87.84336;
        const latDifInKm = Math.abs(filters.mapCenterLat - p.location.lat) * 111;
        if (!(kmInView >= Math.sqrt(Math.pow(lngDifInKm, 2) + Math.pow(latDifInKm, 2)))) {
          return false;
        }
      }

      return true;
    });
  }

  private getQBWhereConditions(filters: PostFilter) {
    return new Brackets((qb) => {
      if (filters.genders) {
        if (!filters.genders.some((g) => g === Gender.Any)) {
          qb.andWhere('group.gender IN (:...genders)', { genders: filters.genders });
        }
      }

      if (filters.parkings) {
        if (!filters.parkings.some((p) => p === PostParkingFilter.Any)) {
          qb.andWhere('post.parkingType IN (:...parkingType)', { parkingType: filters.parkings });
        }
      }

      if (filters.housingTypes) {
        if (!filters.housingTypes.some((t) => t === PostTypeFilter.Any)) {
          qb.andWhere('post.houseType IN (:...type)', { type: filters.housingTypes });
        }
      }

      if (filters.pets) {
        if (!filters.pets.some((p) => p === PostPetFilter.Any)) {
          qb.andWhere('post.petsAllowed IN (:...petsAllowed)', {
            petsAllowed: filters.pets.map((p) => p === PostPetFilter.Allowed),
          });
        }
      }

      if (filters.minPrice && filters.maxPrice) {
        qb.andWhere('post.rent BETWEEN :minPrice AND :maxPrice', {
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        });
      } else if (filters.minPrice) {
        qb.andWhere('post.rent >= :minPrice', {
          minPrice: filters.minPrice,
        });
      } else if (filters.maxPrice) {
        qb.andWhere('post.rent <= :maxPrice', {
          maxPrice: filters.maxPrice,
        });
      }

      return qb;
    });
  }
}
