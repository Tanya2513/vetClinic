import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { PatientService } from './services/patient.service';
import { SpeciesService } from './services/species.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { HospitalizedPatient } from './entities/hospitalizedPatient.entity';
import { Species } from './entities/species.entity';
import { PatientController } from './controllers/patient.controller';
import { SpeciesController } from './controllers/species.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forFeature([HospitalizedPatient]),
    TypeOrmModule.forFeature([Species]),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
  ],
  controllers: [AppController, PatientController, SpeciesController],
  providers: [PatientService, SpeciesService],
})
export class ClinicModule {
  constructor(private connection: Connection) {}
}
