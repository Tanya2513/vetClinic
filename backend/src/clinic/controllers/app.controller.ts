import { Controller, Get } from '@nestjs/common';
import { PatientService } from '../services/patient.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: PatientService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
