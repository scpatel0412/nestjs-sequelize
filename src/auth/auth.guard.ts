import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  private readonly CONTEXT_TYPES = {
    HTTP: 'http',
    GRAPHQL: 'graphql',
  };

  constructor(private reflector: Reflector, private authService: AuthService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  getHttpRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  async canActivate(context): Promise<boolean> {
    let canActivate;

    const allowUnauthorized = this.contextMetadata<boolean>(
      context,
      'AUTH_ALLOW_UNAUTHORIZED',
    );
    if (context.contextType === this.CONTEXT_TYPES.GRAPHQL) {
      const allowRestore = this.contextMetadata<boolean>(
        context,
        'AUTH_ALLOW_RESTORE',
      );
      const token = (
        this.getRequest(context).header('authorization') || ''
      ).replace('Bearer ', '');
      try {
        await super.canActivate(context);
        if (token) {
          canActivate = await this.authService.validateAccessToken(token);
        } else {
          canActivate = false;
        }
      } catch (e) {
        canActivate = false;
      }

      if (!canActivate && allowUnauthorized) {
        canActivate = true;
      }
      if (!canActivate) {
        throw new UnauthorizedException();
      }
    } else if (context.contextType === this.CONTEXT_TYPES.HTTP) {
      // if we use REST
      const req = this.getHttpRequest(context);
      const user = await this.authService.decodeAccessToken(
        AuthService.extractBearer(req.headers.authorization),
      );
      if (user || allowUnauthorized) {
        req.user = user || {};
        canActivate = true;
      }
    } else {
      // default decline connection
      canActivate = false;
    }
    return canActivate;
  }
  private contextMetadata<T>(context: ExecutionContext, metadataKey) {
    return this.reflector.getAllAndOverride<T>(metadataKey, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
