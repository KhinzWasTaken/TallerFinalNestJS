import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected/role-protected.decorator';
import { ValidRoles } from '../interfaces/valid-roles';
import { UserRolesGuard } from '../guards/user-roles/user-roles.guard';

export function Auth(...roles: ValidRoles[]) {

  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard('jwt'), UserRolesGuard),
  );

}
