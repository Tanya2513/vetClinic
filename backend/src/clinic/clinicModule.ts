import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { PatientService } from './services/patient.service';
import { SpeciesService } from './services/species.service';
import { TestController} from "./controllers/test.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { Species } from './entities/species.entity';
import { PatientController } from './controllers/patient.controller';
import { SpeciesController } from './controllers/species.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forFeature([Species]),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
  ],
  controllers: [
    AppController,
    PatientController,
    SpeciesController,
    TestController,
  ],
  providers: [PatientService, SpeciesService],
})
export class ClinicModule {
  constructor(private connection: Connection) {}
}
