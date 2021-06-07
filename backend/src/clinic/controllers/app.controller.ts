import { Controller, Get } from '@nestjs/common';
import { ClinicService } from '../services/clinic.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: ClinicService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
