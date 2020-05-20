import { DiarioProfessorRepository } from './diario-professor.repository';
import { Module } from '@nestjs/common';
import { DiarioProfessorService } from './diario-professor.service';
import { DiarioProfessorController } from './diario-professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DiarioProfessorRepository])],
  providers: [DiarioProfessorService],
  controllers: [DiarioProfessorController]
})
export class DiarioProfessorModule { }
