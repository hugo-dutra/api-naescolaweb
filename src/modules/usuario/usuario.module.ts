import { UsuarioEscolaRespository } from './../usuario-escola/usuario-escola.repository';
import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { EscolaRepository } from '../escola/escola.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRepository, UsuarioProfessorRepository, EscolaRepository, UsuarioEscolaRespository])],
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule { }
