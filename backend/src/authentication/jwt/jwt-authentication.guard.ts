import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from '@rmtd/common/enums';
import { ROLE_KEY } from '../auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('jwt guard');

    const role = this.reflector.getAllAndOverride<AuthRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (role == AuthRole.Public) return true;

    return super.canActivate(context);
  }
}
