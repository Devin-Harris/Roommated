import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthType } from '@rmtd/common/enums';
import { AUTH_TYPE } from '../auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('jwt guard');
    const authType = this.reflector.getAllAndOverride<AuthType>(AUTH_TYPE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (authType == AuthType.Public) return true;

    // let payload;
    // try {
    //   payload = this.jwtService.verify(
    //     ExtractJwt.fromAuthHeaderAsBearerToken()(context.switchToHttp().getRequest()),
    //     { secret: `${process.env.JWT_SECRET}` },
    //   );
    // } catch (error) {
    //   throw new UnauthorizedException();
    // }

    // if (authType == AuthType.Founder) return payload && payload.isAdmin;

    return super.canActivate(context);
  }
}
