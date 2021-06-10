import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ClinicService } from './services/clinic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientController } from './controllers/patient.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
  ],
  controllers: [AppController, PatientController],
  providers: [ClinicService],
})
export class ClinicModule {
  constructor(private connection: Connection) {}
}