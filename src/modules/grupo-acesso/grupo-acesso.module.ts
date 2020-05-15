import { GrupoAcessoRepository } from './grupo-acesso.repository';
import { Module } from '@nestjs/common';
import { GrupoAcessoService } from './grupo-acesso.service';
import { GrupoAcessoController } from './grupo-acesso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoAcessoRepository])],
  providers: [GrupoAcessoService],
  controllers: [GrupoAcessoController]
})
export class GrupoAcessoModule { }
