import { EscopoPerfilUsuarioRepository } from './escopo-perfil-usuario.repository';
import { Module } from '@nestjs/common';
import { EscopoPerfilUsuarioService } from './escopo-perfil-usuario.service';
import { EscopoPerfilUsuarioController } from './escopo-perfil-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EscopoPerfilUsuarioRepository])],
  providers: [EscopoPerfilUsuarioService],
  controllers: [EscopoPerfilUsuarioController],
  exports: [EscopoPerfilUsuarioService],
})
export class EscopoPerfilUsuarioModule { }
