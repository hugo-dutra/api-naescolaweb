import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRepository, UsuarioProfessorRepository])],
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule { }
