import { SetMetadata } from '@nestjs/common';
import { AuthType } from '@rmtd/common/enums/auth-type.enum';

export const AUTH_TYPE = 'authType';
export const Auth = (authType: AuthType) => SetMetadata(AUTH_TYPE, authType);
