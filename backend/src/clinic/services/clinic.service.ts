import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  findOne(id: string): Promise<Patient> {
    return this.patientRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.patientRepository.delete(id);
  }

  getHello(): string {
    return 'Hello World!';
  }

  getList(): any {
    return { a: 1, b: 2 };
  }
}
