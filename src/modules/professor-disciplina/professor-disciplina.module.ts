import { Module } from '@nestjs/common';
import { ProfessorDisciplinaService } from './professor-disciplina.service';
import { ProfessorDisciplinaController } from './professor-disciplina.controller';

@Module({
  providers: [ProfessorDisciplinaService],
  controllers: [ProfessorDisciplinaController]
})
export class ProfessorDisciplinaModule {}
