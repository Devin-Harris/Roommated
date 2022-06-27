// Let's you type @UseGuards(LocalAuthGuard) instead of @UseGuards(AuthGuard('local'))

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('local guard');
    return super.canActivate(context);
  }
}
