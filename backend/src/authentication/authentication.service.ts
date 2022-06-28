import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from 'src/encryption/encryption.service';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
  ) {}

  /** Returns the User with corresponding and valid email and password, else null. */
  async validateUser(loginEmail: string, plainTextPswrd: string): Promise<User> {
    const user = await this.usersService.findByEmail(loginEmail);
    if (!user) return null;
    if (await this.encryptionService.isMatch(plainTextPswrd, user.password)) {
      return user;
    }
  }

  /** Creates a JWT for a given User */
  async issueJWT(user: User): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload, { secret: `${process.env.JWT_SECRET}` }),
    };
  }
}
