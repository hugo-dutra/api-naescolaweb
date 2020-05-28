import { ProfessorEscolaRepository } from './professor-escola.repository';
import { Module } from '@nestjs/common';
import { ProfessorEscolaService } from './professor-escola.service';
import { ProfessorEscolaController } from './professor-escola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorEscolaRepository]), ProfessorModule],
  providers: [ProfessorEscolaService],
  controllers: [ProfessorEscolaController]
})
export class ProfessorEscolaModule { }
