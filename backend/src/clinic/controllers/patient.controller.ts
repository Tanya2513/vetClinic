import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { ClinicService } from '../services/clinic.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { listPatientDTO } from '../dto/list-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  //Функция асинхронная
  async create(@Body() createPatientDto: CreatePatientDto) {
    //Нужно подождать пока создастся перед тем как вывести created
    await this.clinicService.create(createPatientDto);
    return 'created';
  }

  @Get()
  findAll(@Query() query: listPatientDTO) {
    return `This action returns all Patients (perPage: ${query.perPage} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} Patient`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} Patient`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} Patient`;
  }
}