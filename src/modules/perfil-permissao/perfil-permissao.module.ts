import { PerfilPermissaoRepository } from './perfil-permissao.repository';
import { Module } from '@nestjs/common';
import { PerfilPermissaoService } from './perfil-permissao.service';
import { PerfilPermissaoController } from './perfil-permissao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilPermissaoRepository])],
  providers: [PerfilPermissaoService],
  controllers: [PerfilPermissaoController]
})
export class PerfilPermissaoModule { }
