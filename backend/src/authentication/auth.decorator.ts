import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthRole } from '@rmtd/common/enums';
import { RolesGuard } from './roles/roles.guard';

export const ROLE_KEY = 'role';
/** Make sure that a guard is set on the next line (using @UseGuards), otherwise the
 *  metadata will go unused */
export function Role(role: AuthRole) {
  console.log('Role decorator: ' + role);
  return applyDecorators(
    SetMetadata(ROLE_KEY, role),
    role != AuthRole.Public ? UseGuards(RolesGuard) : UseGuards(),
  );
}
