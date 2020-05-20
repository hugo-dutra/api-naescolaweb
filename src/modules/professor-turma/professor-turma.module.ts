import { ProfessorTurmaRepository } from './professor-turma.repository';
import { Module } from '@nestjs/common';
import { ProfessorTurmaService } from './professor-turma.service';
import { ProfessorTurmaController } from './professor-turma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorTurmaRepository])],
  providers: [ProfessorTurmaService],
  controllers: [ProfessorTurmaController]
})
export class ProfessorTurmaModule { }
