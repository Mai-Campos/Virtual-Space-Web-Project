import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';

declare module 'express' {
  interface Request {
    user?: { roles: string[] };
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user;

    if (!user || !user.roles) throw new ForbiddenException('No roles assigned');

    const hasRoles = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasRoles) throw new ForbiddenException('Acces denied');

    return true;
  }
}
