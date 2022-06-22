import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from 'src/encryption/encryption.service';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private encryptionService: EncryptionService,
  ) {}

  async validateUser(loginEmail: string, plainTextPswrd: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: loginEmail },
    });
    if (user) {
      const validUser = await this.encryptionService.isMatch(plainTextPswrd, user.password);
      if (validUser) return user;
    }
    return null;
  }
}
