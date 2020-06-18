import { ProfessorEscolaRepository } from './professor-escola.repository';
import { Module } from '@nestjs/common';
import { ProfessorEscolaService } from './professor-escola.service';
import { ProfessorEscolaController } from './professor-escola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorModule } from '../professor/professor.module';
import { ProfessorRepository } from '../professor/professor.repository';
import { UsuarioProfessorRepository } from '../usuario-professor/usuario-professor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorEscolaRepository, ProfessorRepository, UsuarioProfessorRepository]), ProfessorModule],
  providers: [ProfessorEscolaService],
  controllers: [ProfessorEscolaController]
})
export class ProfessorEscolaModule { }
