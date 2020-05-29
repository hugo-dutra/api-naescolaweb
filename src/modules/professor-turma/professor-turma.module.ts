import { ProfessorDisciplinaModule } from './../professor-disciplina/professor-disciplina.module';
import { ProfessorModule } from './../professor/professor.module';
import { ProfessorTurmaRepository } from './professor-turma.repository';
import { Module } from '@nestjs/common';
import { ProfessorTurmaService } from './professor-turma.service';
import { ProfessorTurmaController } from './professor-turma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorTurmaRepository]), ProfessorModule, ProfessorDisciplinaModule],
  providers: [ProfessorTurmaService],
  controllers: [ProfessorTurmaController]
})
export class ProfessorTurmaModule { }
