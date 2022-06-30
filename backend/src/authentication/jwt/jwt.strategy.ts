import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
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
    const group = await this.groupUsersService.findGroupByUserId(payload.sub);

    // Attaches the following user property onto the request object
    return {
      id: payload.sub,
      firstName: payload.firstName,
      lastName: payload.lastName,
      isAdmin: payload.isAdmin,
      groupId: group?.groupId,
      groupRole: group?.groupRole,
    };
  }
}
