import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { DiarioProfessorRepository } from './diario-professor.repository';
import { Module } from '@nestjs/common';
import { DiarioProfessorService } from './diario-professor.service';
import { DiarioProfessorController } from './diario-professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorRepository } from '../professor/professor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiarioProfessorRepository, ProfessorRepository, UsuarioProfessorRepository])],
  providers: [DiarioProfessorService],
  controllers: [DiarioProfessorController]
})
export class DiarioProfessorModule { }
