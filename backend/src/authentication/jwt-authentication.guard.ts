// Let's you type @UseGuards(JwtAuthGuard) instead of @UseGuards(AuthGuard('jwt'))

import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const authType = this.reflector.getAllAndOverride<string>('authType', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (authType == 'public') return true;
    const payload = this.jwtService.verify(
      ExtractJwt.fromAuthHeaderAsBearerToken()(context.switchToHttp().getRequest()),
      { secret: `${process.env.JWT_SECRET}` },
    );
    switch (authType) {
      case 'admin':
        return payload && payload.isAdmin;
      default:
        return super.canActivate(context);
    }
  }
}
