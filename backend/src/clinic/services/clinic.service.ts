import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { listPatientDTO } from '../dto/list-patient.dto';

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

  async getList(query: listPatientDTO): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = new Patient();
    patient.name = createPatientDto.name;
    patient.age = createPatientDto.age;
    patient.species = createPatientDto.species;
    patient.diagnosis = createPatientDto.diagnosis;
    patient.date = createPatientDto.date;
    return await this.patientRepository.save(patient);
  }
}
