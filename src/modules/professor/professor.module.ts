import { ProfessorEscolaRepository } from './../professor-escola/professor-escola.repository';
import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { EscopoPerfilUsuarioService } from './../escopo-perfil-usuario/escopo-perfil-usuario.service';
import { ProfessorRepository } from './professor.repository';
import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscopoPerfilUsuarioRepository } from '../escopo-perfil-usuario/escopo-perfil-usuario.repository';
import { EscolaRepository } from '../escola/escola.repository';
import { EscopoPerfilUsuarioModule } from '../escopo-perfil-usuario/escopo-perfil-usuario.module';
import { DiarioProfessorRepository } from '../diario-professor/diario-professor.repository';
import { ProfessorDisciplinaRepository } from '../professor-disciplina/professor-disciplina.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ProfessorRepository,
        EscopoPerfilUsuarioRepository,
        UsuarioProfessorRepository,
        DiarioProfessorRepository,
        ProfessorDisciplinaRepository,
        ProfessorEscolaRepository,
        DiarioProfessorRepository,
        UsuarioProfessorRepository,
        EscolaRepository,
      ]
    )
    , EscopoPerfilUsuarioModule,
  ],
  providers: [ProfessorService],
  controllers: [ProfessorController],
  exports: [ProfessorService]
})
export class ProfessorModule { }
