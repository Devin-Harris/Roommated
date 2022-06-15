import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { EncryptionService } from 'src/encryption/encryption.service';
import { DeleteResult, In } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './users.entity';
import {
  CreateUserDto,
  CreateUsersDto,
  UpdateUserDto,
  UpdateUsersDto,
  ResponseUserDto,
} from '@rmtd/common/dtos';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { CloudinaryService } from 'src/providers/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private cloudinaryService: CloudinaryService,
    private encryptionService: EncryptionService,
  ) {}

  findByIds(ids: number[]): Promise<User[]> {
    return this.usersRepository.find({ where: { id: In(ids) } });
  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createUsers(data: CreateUsersDto): Promise<User[]> {
    let users = [];
    for (let i = 0; i < data.items.length; i++) {
      const user: CreateUserDto = data.items[i];
      const hashedPassword = await this.hashUserPassword(user);
      users.push({
        ...user,
        password: hashedPassword,
      });
    }

    try {
      return await this.usersRepository.save(users);
    } catch (e: any) {
      if (e.message) {
        throw new BadRequestException(e.message);
      }
    }
  }

  async updateByIds(data: UpdateUsersDto): Promise<User[]> {
    let users: UpdateUserDto[] = [];
    for (let i = 0; i < data.items.length; i++) {
      const user: UpdateUserDto = data.items[i];
      if (user.password) {
        const hashedPassword = await this.hashUserPassword(user);
        users.push({
          ...user,
          password: hashedPassword,
        });
      } else {
        users.push({ ...user });
      }
    }

    return this.usersRepository.save(users);
  }

  async updateById(user: UpdateUserDto): Promise<User> {
    let mutatedUser: UpdateUserDto = user;
    if (user.password) {
      const hashedPassword = await this.hashUserPassword(user);
      mutatedUser = {
        ...user,
        password: hashedPassword,
      };
    }

    return this.usersRepository.save({ ...mutatedUser });
  }

  deleteByIds(ids: number[]): Promise<DeleteResult> {
    return this.usersRepository.delete({ id: In(ids) });
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }

  mapUsersToResponseDto(users: User[]): ResponseUserDto[] {
    return users.map((user: User) => this.mapUserToResponseDto(user));
  }

  mapUserToResponseDto(user: User): ResponseUserDto {
    return plainToClass(ResponseUserDto, instanceToPlain(user), {
      excludeExtraneousValues: true,
    });
  }

  private async hashUserPassword(user: UpdateUserDto | CreateUserDto): Promise<string> {
    return await this.encryptionService.hash(user.password);
  }

  async uploadProfileImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return this.cloudinaryService.uploadImage(file);
  }
}
