import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ListController } from './controllers/list.controller';
import { ClinicService } from './services/clinic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Patient } from './entities/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
  ],
  controllers: [AppController, ListController],
  providers: [ClinicService],
})
export class ClinicModule {
  constructor(private connection: Connection) {}
}
