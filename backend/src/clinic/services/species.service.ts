import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Species } from '../entities/species.entity';
import { CreateSpeciesDto } from '../dto/create-species.dto';
import { ListSpeciesDto } from '../dto/list-species.dto';
import { UpdateSpeciesDto } from '../dto/update-species.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) {}

  // async findAll(): Promise<Patient[]> {
  //   return await this.patientRepository.find();
  // }

  async findOne(id: string): Promise<Species> {
    return await this.speciesRepository.findOne(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.speciesRepository.delete(id);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getList(query: ListSpeciesDto): Promise<Species[]> {
    return await this.speciesRepository.find();
  }

  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const species = new Species();
    species.type = createSpeciesDto.type;
    species.description = createSpeciesDto.description;
    species.features = createSpeciesDto.features;
    return await this.speciesRepository.save(species);
  }

  async update(updateSpeciesDto: UpdateSpeciesDto): Promise<Species> {
    const species = await this.speciesRepository.findOne(updateSpeciesDto.id);
    species.type = updateSpeciesDto.type;
    species.description = updateSpeciesDto.description;
    species.features = updateSpeciesDto.features;
    return await this.speciesRepository.save(species);
  }
}
