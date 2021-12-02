import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SpeciesService } from '../services/species.service';
import { CreateSpeciesDto } from '../dto/create-species.dto';
import { ListSpeciesDto } from '../dto/list-species.dto';
import { UpdateSpeciesDto } from '../dto/update-species.dto';
import { Species } from '../entities/species.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PatientService } from '../services/patient.service';

@Controller('species')
@UseGuards(JwtAuthGuard)
export class SpeciesController {
  constructor(
    private readonly speciesService: SpeciesService,
    private readonly patientService: PatientService,
  ) {}

  @Post()
  //Функция асинхронная
  async create(@Body() createSpeciesDto: CreateSpeciesDto) {
    //Нужно подождать пока создастся перед тем как вывести created
    const species = await this.speciesService.create(createSpeciesDto);
    if (species instanceof Species) {
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
  async getList(@Query() query: ListSpeciesDto) {
    return await this.speciesService.getList(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.speciesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSpeciesDto: UpdateSpeciesDto,
  ) {
    console.log('put:id');
    const species = await this.speciesService.update(id, updateSpeciesDto);
    if (species instanceof Species) {
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
    const patients = await this.patientService.getList({ speciesId: id });
    if (patients.length > 0) {
      return {
        success: false,
        message: 'Не можливо видалити вид. За ним є закріплені паціенти.',
      };
    }
    const deleteResult = await this.speciesService.remove(id);
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
