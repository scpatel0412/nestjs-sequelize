import { SetMetadata } from '@nestjs/common';

export const AllowUnauthorized = () =>
  SetMetadata('AUTH_ALLOW_UNAUTHORIZED', true);
