import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { HospitalizedPatient } from '../entities/hospitalizedPatient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { ListPatientDto } from '../dto/list-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { RemotePatient } from '../entities/remotePatient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(HospitalizedPatient)
    private hospitalizedPatientRepository: Repository<HospitalizedPatient>,
    @InjectRepository(RemotePatient)
    private remotePatientRepository: Repository<RemotePatient>,
  ) {}

  async findOne(id: string): Promise<Patient> {
    const query = this.patientRepository
      .createQueryBuilder('patient')
      .select('patient.*')
      .leftJoinAndSelect('patient.species', 'species')
      .where('patient.id = :id', { id });

    return await query.getRawOne<Patient>();
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.patientRepository.delete(id);
  }

  async getList(query: ListPatientDto): Promise<Patient[]> {
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

    return await queryBuilder.getMany();
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = new Patient(
      createPatientDto.name,
      createPatientDto.birthDate,
      createPatientDto.speciesId,
      createPatientDto.breed,
      createPatientDto.diagnosis,
      createPatientDto.visitDate,
      createPatientDto.animalOwner,
      createPatientDto.numberOwner,
    );

    return await this.patientRepository.save(patient);
  }

  async update(updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patientRepository.findOne(updatePatientDto.id);
    patient.name = updatePatientDto.name;
    patient.birthDate = updatePatientDto.birthDate;
    patient.speciesId = updatePatientDto.speciesId;
    patient.breed = updatePatientDto.breed;
    patient.diagnosis = updatePatientDto.diagnosis;
    patient.visitDate = updatePatientDto.visitDate;
    patient.animalOwner = updatePatientDto.animalOwner;
    patient.numberOwner = updatePatientDto.numberOwner;
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

  async remote(
    id: number,
    remoteVisitDate: string,
    remoteVisitAddress: string,
  ) {
    const remotePatient = await this.remotePatientRepository.findOne(id);
    remotePatient.remoteVisitDate = remoteVisitDate;
    remotePatient.remoteVisitAddress = remoteVisitAddress;
    return await this.remotePatientRepository.save(remotePatient);
  }
}
