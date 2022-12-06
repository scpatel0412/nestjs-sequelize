import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createAccessToken(payload): Promise<any> {
    const token = this.jwtService.sign(payload);
    //localStorage.setItem('token', token);
    return token;
  }

  async decodeAccessToken(token): Promise<any> {
    return this.jwtService.decode(token);
  }

  async validateAccessToken(token: any): Promise<boolean> {
    const validate = this.jwtService.verify(token);
    if (typeof validate === 'object') {
      if (Object.keys(validate).length > 0) {
        return true;
      } else {
        return false;
      }
    } else if (typeof validate === 'undefined') {
      return false;
    } else {
      return false;
    }
  }

  async deleteAccessToken(): Promise<any> {
    return localStorage.removeItem('token');
  }

  public static extractBearer(token) {
    return (token || ' ').split(' ')[1];
  }

  async validateRestoreToken(token: any): Promise<boolean> {
    const validate = this.jwtService.verify(token);
    if (typeof validate === 'object') {
      if (Object.keys(validate).length > 0) {
        return true;
      } else {
        return false;
      }
    } else if (typeof validate === 'undefined') {
      return false;
    } else {
      return false;
    }
  }
}
