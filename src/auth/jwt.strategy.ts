import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0ODgwNzQ2MiwiaWF0IjoxNjQ4ODA3NDYyfQ.x4UoMjwRPrRFZlxaWjgtmF1HuxOnE0wHOvPl_yE_76I',
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    return payload;
  }
}
