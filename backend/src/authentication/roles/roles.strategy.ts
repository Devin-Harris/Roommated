import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RolesStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(): Promise<any> {
    return true;
  }
}
