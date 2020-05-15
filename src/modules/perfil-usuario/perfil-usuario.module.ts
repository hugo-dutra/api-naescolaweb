import { Module } from '@nestjs/common';
import { PerfilUsuarioService } from './perfil-usuario.service';
import { PerfilUsuarioController } from './perfil-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilUsuarioRepository } from './perfil-usuario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilUsuarioRepository])],
  providers: [PerfilUsuarioService],
  controllers: [PerfilUsuarioController]
})
export class PerfilUsuarioModule { }
