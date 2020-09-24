import { DiretorEscolaRepository } from './../diretor-escola/diretor-escola.repository';
import { RegiaoEscolaRepository } from './../regiao-escola/regiao-escola.repository';
import { Module } from '@nestjs/common';
import { EscolaService } from './escola.service';
import { EscolaController } from './escola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscolaRepository } from './escola.repository';
import { PerfilUsuarioRepository } from '../perfil-usuario/perfil-usuario.repository';
import { UsuarioEscolaRespository } from '../usuario-escola/usuario-escola.repository';
import { PermissaoAcessoRepository } from '../permissao-acesso/permissao-acesso.repository';
import { PerfilPermissaoRepository } from '../perfil-permissao/perfil-permissao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    EscolaRepository,
    RegiaoEscolaRepository,
    DiretorEscolaRepository,
    PerfilUsuarioRepository,
    UsuarioEscolaRespository,
    PermissaoAcessoRepository,
    PerfilPermissaoRepository])],
  providers: [EscolaService],
  controllers: [EscolaController],
  exports: [EscolaService],
})
export class EscolaModule { }
