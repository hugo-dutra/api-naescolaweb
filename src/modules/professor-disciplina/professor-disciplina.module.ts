import { ProfessorTurmaRepository } from './../professor-turma/professor-turma.repository';
import { ProfessorDisciplinaRepository } from './professor-disciplina.repository';
import { Module } from '@nestjs/common';
import { ProfessorDisciplinaService } from './professor-disciplina.service';
import { ProfessorDisciplinaController } from './professor-disciplina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorDisciplinaRepository, ProfessorTurmaRepository]), ProfessorModule],
  providers: [ProfessorDisciplinaService],
  controllers: [ProfessorDisciplinaController],
  exports: [ProfessorDisciplinaService],
})
export class ProfessorDisciplinaModule { }
