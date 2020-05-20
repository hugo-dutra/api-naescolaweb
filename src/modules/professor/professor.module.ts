import { ProfessorRepository } from './professor.repository';
import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorRepository])],
  providers: [ProfessorService],
  controllers: [ProfessorController]
})
export class ProfessorModule { }
