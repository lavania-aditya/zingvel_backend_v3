import * as jwt from 'jsonwebtoken';
import {
  SetMetadata,
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export type UserType = 'user' | 'partner' | 'cms-user' | 'visitor';
export type RoleType = UserType;

export interface JwtPayload {
  sub: string;
  type: UserType;
  userId: string;
  username?: string;
  email?: string;
  phNumber?: number;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'your_default_secret'; // Use env variable in production!

export async function generateToken(
  type: UserType,
  account: any,
): Promise<{ data: { type: UserType; account: any }; token: string }> {
  const payload: JwtPayload = {
    sub: account.id,
    type,
    userId: account.id,
    username: account.name || account.userName,
    email: account.email,
    phNumber: account.phNumber,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '3600s' });
  return {
    data: {
      type,
      account,
    },
    token,
  };
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
  } catch (e) {
    return null;
  }
}

// --- Role-based Auth Decorators/Guard ---
export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !requiredRoles.includes(user.type)) {
      throw new ForbiddenException(
        'You do not have permission (role) to access this resource',
      );
    }
    return true;
  }
}
