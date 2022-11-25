import { SetMetadata } from '@nestjs/common';

export const AllowRestoreAccess = () => SetMetadata('AUTH_ALLOW_RESTORE', true);
