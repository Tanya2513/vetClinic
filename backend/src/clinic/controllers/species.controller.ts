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
import { SpeciesService } from '../services/species.service';
import { CreateSpeciesDto } from '../dto/create-species.dto';
import { listSpeciesDto } from '../dto/list-species.dto';
import { UpdateSpeciesDto } from '../dto/update-species.dto';
import { Species } from '../entities/species.entity';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

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
  async getList(@Query() query: listSpeciesDto) {
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
    const species = await this.speciesService.update(updateSpeciesDto);
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
