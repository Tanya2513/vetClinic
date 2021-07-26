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
import { ListPatientDto } from '../dto/list-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entities/patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  //Функция асинхронная
  async create(@Body() createPatientDto: CreatePatientDto) {
    //Нужно подождать пока создастся перед тем как вывести created
    const patient = await this.clinicService.create(createPatientDto);
    if (patient instanceof Patient) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  @Get()
  async getList(@Query() query: ListPatientDto) {
    return await this.clinicService.getList(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clinicService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    const patient = await this.clinicService.update(updatePatientDto);
    if (patient instanceof Patient) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteResult = await this.clinicService.remove(id);
    if (deleteResult.affected == 1) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }
}
