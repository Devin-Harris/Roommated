import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRole } from '@rmtd/common/enums';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('roles guard');
    const role = this.reflector.getAllAndOverride<AuthRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const user = context.switchToHttp().getRequest().user;
    if (role == AuthRole.Founder) {
      if (user.isAdmin) {
        return true;
      }
    }
    console.log('do the roles strat');
    throw new UnauthorizedException();
  }
}
