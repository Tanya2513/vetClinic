import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { ListPatientDto } from '../dto/list-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  // async findAll(): Promise<Patient[]> {
  //   return await this.patientRepository.find();
  // }

  async findOne(id: string): Promise<Patient> {
    return await this.patientRepository.findOne(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.patientRepository.delete(id);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getList(query: ListPatientDto): Promise<Patient[]> {
    // console.log('condition', condition);
    // return await this.patientRepository.find({
    //   where: [condition],
    // });

    const queryBuilder = this.patientRepository
      .createQueryBuilder('patient')
      .orderBy('patient.id', 'DESC');

    query.name &&
      queryBuilder.where('patient.name like :name', {
        name: '%' + query.name + '%',
      });

    query.species &&
      queryBuilder.where('patient.species = :species', {
        species: query.species,
      });

    console.log('Database query', queryBuilder.getQuery());

    return await queryBuilder.getMany();
  }


  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = new Patient();
    patient.name = createPatientDto.name;
    patient.age = createPatientDto.age;
    patient.species = createPatientDto.species;
    patient.diagnosis = createPatientDto.diagnosis;
    patient.visitDate = createPatientDto.visitDate;
    return await this.patientRepository.save(patient);
  }

  async update(updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patientRepository.findOne(updatePatientDto.id);
    patient.name = updatePatientDto.name;
    patient.age = updatePatientDto.age;
    patient.species = updatePatientDto.species;
    patient.diagnosis = updatePatientDto.diagnosis;
    patient.visitDate = updatePatientDto.visitDate;
    return await this.patientRepository.save(patient);
  }
}
