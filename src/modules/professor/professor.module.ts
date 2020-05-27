import { EscopoPerfilUsuarioService } from './../escopo-perfil-usuario/escopo-perfil-usuario.service';
import { ProfessorRepository } from './professor.repository';
import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscopoPerfilUsuarioRepository } from '../escopo-perfil-usuario/escopo-perfil-usuario.repository';
import { EscolaRepository } from '../escola/escola.repository';
import { EscopoPerfilUsuarioModule } from '../escopo-perfil-usuario/escopo-perfil-usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ProfessorRepository,
        EscopoPerfilUsuarioRepository,
        EscolaRepository,
      ]
    )
    , EscopoPerfilUsuarioModule,
  ],
  providers: [ProfessorService],
  controllers: [ProfessorController]
})
export class ProfessorModule { }
