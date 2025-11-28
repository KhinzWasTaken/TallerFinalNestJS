import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from '../../decorators/role-protected/role-protected.decorator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class UserRolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler() );

    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as Usuario;

    if ( !user ) 
      throw new BadRequestException('User not found');

    if ( validRoles.includes( user.rol ) ) {
      return true;
    }

    throw new ForbiddenException(
      `User ${ user.nombre_completo } need a valid role: [${ validRoles }]`
    );
  }
}
