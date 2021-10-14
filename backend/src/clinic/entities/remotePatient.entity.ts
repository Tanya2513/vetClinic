import { Entity, Column } from 'typeorm';
import { Patient } from './patient.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'patient' })
export class RemotePatient extends Patient {
  @Column()
  remoteVisitDate: string;
  @Column()
  remoteVisitAddress: string;
}
