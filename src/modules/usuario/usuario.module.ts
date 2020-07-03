import { jwtConfig } from './../../config/typeorm.config';
import { UsuarioEscolaRespository } from './../usuario-escola/usuario-escola.repository';
import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { EscolaRepository } from '../escola/escola.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EscopoPerfilUsuarioRepository } from '../escopo-perfil-usuario/escopo-perfil-usuario.repository';


@Module({
  imports: [TypeOrmModule.forFeature([
    UsuarioRepository,
    UsuarioProfessorRepository,
    EscolaRepository,
    UsuarioEscolaRespository,
    EscopoPerfilUsuarioRepository,]),
  JwtModule.register({
    secret: jwtConfig.secret,
    signOptions: { expiresIn: '86400s' },
  })],
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule { }
