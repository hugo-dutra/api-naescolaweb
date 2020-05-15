import { PermissaoAcessoRepository } from './permissao-acesso.repository';
import { Module } from '@nestjs/common';
import { PermissaoAcessoService } from './permissao-acesso.service';
import { PermissaoAcessoController } from './permissao-acesso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PermissaoAcessoRepository])],
  providers: [PermissaoAcessoService],
  controllers: [PermissaoAcessoController]
})
export class PermissaoAcessoModule { }
