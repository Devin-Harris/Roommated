import { Strategy } from 'passport';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesStrategy extends PassportStrategy(Strategy, 'roles') {
  constructor() {
    super();
  }

  async validate(): Promise<any> {
    console.log('roles strat');
    return true;
  }
}
