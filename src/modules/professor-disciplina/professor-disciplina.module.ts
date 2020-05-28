import { ProfessorDisciplinaRepository } from './professor-disciplina.repository';
import { Module } from '@nestjs/common';
import { ProfessorDisciplinaService } from './professor-disciplina.service';
import { ProfessorDisciplinaController } from './professor-disciplina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorDisciplinaRepository]), ProfessorModule],
  providers: [ProfessorDisciplinaService],
  controllers: [ProfessorDisciplinaController]
})
export class ProfessorDisciplinaModule { }
