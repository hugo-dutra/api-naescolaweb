import { UsuarioProfessorRepository } from './usuario-professor.repository';
import { Module } from '@nestjs/common';
import { UsuarioProfessorService } from './usuario-professor.service';
import { UsuarioProfessorController } from './usuario-professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioProfessorRepository])],
  providers: [UsuarioProfessorService],
  controllers: [UsuarioProfessorController]
})
export class UsuarioProfessorModule { }
