import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(readonly Service: AppService) {}

  @Get('/')
  getHello(): string {
    return this.Service.getHello();
  }
}
