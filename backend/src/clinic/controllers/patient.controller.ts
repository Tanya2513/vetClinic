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
import { PatientService } from '../services/patient.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { ListPatientDto } from '../dto/list-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entities/patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  //Функция асинхронная
  async create(@Body() createPatientDto: CreatePatientDto) {
    //Нужно подождать пока создастся перед тем как вывести created
    const patient = await this.patientService.create(createPatientDto);
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
    return await this.patientService.getList(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    const patient = await this.patientService.update(updatePatientDto);
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
    let patient = await this.patientService.findOne(id);
    if (!patient) {
      return {
        success: false,
        error: 'Patient not found',
      };
    }

    const deleteResult = await this.patientService.remove(id);
    if (deleteResult.affected == 1) {
      patient = null; //удаляем обьект
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
