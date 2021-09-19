import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { HospitalizedPatient } from '../entities/hospitalizedPatient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { ListPatientDto } from '../dto/list-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private hospitalizedPatientRepository: Repository<HospitalizedPatient>,
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
      .orderBy('patient.id', 'DESC')
      .leftJoinAndSelect('patient.species', 'species');

    query.name &&
      queryBuilder.where('patient.name like :name', {
        name: '%' + query.name + '%',
      });

    !isNaN(Number.parseInt(query.speciesId)) &&
      queryBuilder.andWhere('patient.speciesId = :speciesId', {
        speciesId: query.speciesId,
      });

    console.log('Database query', queryBuilder.getQuery());

    return await queryBuilder.getMany();
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = new Patient(
      createPatientDto.name,
      createPatientDto.birthDate,
      createPatientDto.speciesId,
      createPatientDto.visitDate,
    );
    patient.diagnosis = createPatientDto.diagnosis;

    return await this.patientRepository.save(patient);
  }

  async update(updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patientRepository.findOne(updatePatientDto.id);
    patient.name = updatePatientDto.name;
    patient.birthDate = updatePatientDto.birthDate;
    patient.speciesId = updatePatientDto.speciesId;
    patient.diagnosis = updatePatientDto.diagnosis;
    patient.visitDate = updatePatientDto.visitDate;
    return await this.patientRepository.save(patient);
  }

  async hospitalizedPatient(
    id: number,
    dateIn: string,
    room: number,
  ): Promise<Patient> {
    const hospitalizedPatient =
      await this.hospitalizedPatientRepository.findOne(id);
    hospitalizedPatient.hospitalize(dateIn, room);
    return await this.hospitalizedPatientRepository.save(hospitalizedPatient);
  }

  async discharge(id: number, dateOut: string): Promise<Patient> {
    const hospitalizedPatient =
      await this.hospitalizedPatientRepository.findOne(id);
    hospitalizedPatient.discharge(dateOut);
    return await this.hospitalizedPatientRepository.save(hospitalizedPatient);
  }
}
