import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret:
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0ODgwNzQ2MiwiaWF0IjoxNjQ4ODA3NDYyfQ.x4UoMjwRPrRFZlxaWjgtmF1HuxOnE0wHOvPl_yE_76I',
      signOptions: { expiresIn: 100 },
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
