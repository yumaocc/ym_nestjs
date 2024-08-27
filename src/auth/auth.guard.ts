import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { TOKEN_KEY } from 'src/config';
import { Public } from 'src/utils';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      Public().KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('登录失败');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload?._doc;
    } catch (error) {
      throw new UnauthorizedException('登录失败');
    }

    return true;
  }

  private extractTokenFromRequest(request: Request): string {
    return request.cookies[TOKEN_KEY];
  }
}
