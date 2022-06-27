import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GroupUsersService } from 'src/groups/group-users/group-users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private groupUsersService: GroupUsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any) {
    console.log('jwt strat');
    const group = await this.groupUsersService.findGroupByUserId(payload.sub);
    if (!group) throw new UnauthorizedException();
    return {
      id: payload.sub,
      firstName: payload.firstName,
      lastName: payload.lastName,
      isAdmin: payload.isAdmin,
      groupId: group.groupId,
      groupRole: group.groupRole,
    };
  }
}
