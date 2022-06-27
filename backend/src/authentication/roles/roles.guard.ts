import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRole, GroupUserRole } from '@rmtd/common/enums';
import { Observable } from 'rxjs';
import { ROLE_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<AuthRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const user = context.switchToHttp().getRequest().user;

    // Always allow if user is a founder
    if (user.isAdmin) return true;
    else {
      // Make sure that they are in a group
      if (!(user.groupId && user.groupRole)) throw new UnauthorizedException();

      // Allow if valid group role
      if (role == AuthRole.GroupAdmin) {
        if (user.groupRole == GroupUserRole.Admin || user.groupRole == GroupUserRole.Owner)
          return true;
      } else if (role == AuthRole.GroupOwner) {
        if (user.groupRole == GroupUserRole.Owner) return true;
      }
    }

    // Default deny
    throw new UnauthorizedException();
  }
}
