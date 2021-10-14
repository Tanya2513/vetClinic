import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Query,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { ListPatientDto } from '../dto/list-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entities/patient.entity';
import { HospitalizedPatient } from '../entities/hospitalizedPatient.entity';
import { HospitalizePatientDto } from '../dto/hospitalize-patient.dto';
import { DischargePatientDto } from '../dto/discharge-patient.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RemotePatientDto } from '../dto/remote-patient.dto';
import {RemotePatient} from "../entities/remotePatient.entity";

@Controller('patient')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
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
    console.log('query', query);
    return await this.patientService.getList(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientService.findOne(id);
  }

  @Put('hospitalize')
  async hospitalize(@Body() hospitalizePatientDto: HospitalizePatientDto) {
    const hospitalizedPatient = await this.patientService.hospitalizedPatient(
      hospitalizePatientDto.id,
      hospitalizePatientDto.dateIn,
      hospitalizePatientDto.room,
    );

    if (hospitalizedPatient instanceof HospitalizedPatient) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  @Put('discharge')
  async discharge(@Body() dischargePatientDto: DischargePatientDto) {
    const dischargePatient = await this.patientService.discharge(
      dischargePatientDto.id,
      dischargePatientDto.dateOut,
    );
    if (dischargePatient instanceof HospitalizedPatient) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  @Put('remote')
  async remote(@Body() remotePatientDto: RemotePatientDto) {
    const remotePatient = await this.patientService.remote(
      remotePatientDto.id,
      remotePatientDto.remoteVisitDate,
      remotePatientDto.remoteVisitAddress,
    );
    if (remotePatient instanceof RemotePatient) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
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
