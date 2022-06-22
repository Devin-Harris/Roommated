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

  /** Returns the User with corresponding and valid email and password, else null. */
  async validateUser(loginEmail: string, plainTextPswrd: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: loginEmail },
    });
    if (!user) return null;
    if (await this.encryptionService.isMatch(plainTextPswrd, user.password)) {
      return user;
    }
  }

  /** Creates a JWT for a given User */
  async issueJWT(user: User): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
