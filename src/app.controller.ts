import { Controller, Get, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { join } from 'path';
import { AppService } from './app.service';
import { AllowUnauthorized } from './auth/decorators/allow-unauthorized.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowUnauthorized()
  @Get()
  root(@Res() res: Response) {
    return res.sendFile(join(__dirname, '../../', 'src/index.html'));
  }
}
