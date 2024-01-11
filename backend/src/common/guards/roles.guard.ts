import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Roles } from '../decorator/roles.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    if (request?.user) {
      const user = await this.userService.getUser(request.user.id);
      const isAdmin = user.role === 'ADMIN';

      //   const matchRole = roles.includes(user.role === 'ADMIN');

      if (!isAdmin) {
        throw new ForbiddenException('Use only for the ADMIN role.');
      }

      return true;
    }

    throw new ForbiddenException('Do not have permission.');
  }
}
