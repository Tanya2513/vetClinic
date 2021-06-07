import { Controller, Get } from '@nestjs/common';
import { ClinicService } from '../services/clinic.service';

@Controller('list')
export class ListController {
  constructor(private readonly appService: ClinicService) {}

  @Get()
  showList(): any {
    return this.appService.findAll();
  }
}
