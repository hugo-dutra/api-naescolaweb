import { Module } from '@nestjs/common';
import { UsuarioEscolaService } from './usuario-escola.service';
import { UsuarioEscolaController } from './usuario-escola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEscolaRespository } from './usuario-escola.repository';
import { EscopoPerfilUsuarioRepository } from '../escopo-perfil-usuario/escopo-perfil-usuario.repository';
import { EscolaRepository } from '../escola/escola.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEscolaRespository, EscopoPerfilUsuarioRepository, EscolaRepository])],
  providers: [UsuarioEscolaService],
  controllers: [UsuarioEscolaController]
})
export class UsuarioEscolaModule { }
