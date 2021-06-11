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
import { DeleteResult } from 'typeorm';

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
  async getList(@Query() query: listPatientDTO) {
    return await this.clinicService.getList(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clinicService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} Patient`;
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
