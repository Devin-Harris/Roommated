import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthRole } from '@rmtd/common/enums';
import { RolesGuard } from './roles.guard';

export const ROLE_KEY = 'role';

export function Role(role: AuthRole) {
  return applyDecorators(
    SetMetadata(ROLE_KEY, role),
    role != AuthRole.Public ? UseGuards(RolesGuard) : UseGuards(),
  );
}
