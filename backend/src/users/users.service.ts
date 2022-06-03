import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from 'src/encryption/encryption.service';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto, CreateUsersDto, User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private encryptionService: EncryptionService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // findOne(id: number): Promise<User> {
  //   return this.usersRepository.findOne({ id });
  // }

  async createUsers(data: CreateUsersDto): Promise<User[]> {
    let users = [];
    for (let i = 0; i < data.items.length; i++) {
      const user: CreateUserDto = data.items[i];
      const hashedPassword = await this.encryptionService.hash(user.password);
      users.push({
        ...data.items[i],
        password: hashedPassword,
      });
    }
    return await this.usersRepository.save(users);
  }

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
