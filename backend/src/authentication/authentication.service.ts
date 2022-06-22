import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from 'src/encryption/encryption.service';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
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

  async issueJWT(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
