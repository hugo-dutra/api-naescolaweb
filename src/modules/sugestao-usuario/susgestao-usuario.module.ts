import { EscolaRepository } from './../escola/escola.repository';
import { SugestaoUsuarioRepository } from './sugestao-usuario.repository';
import { Module } from '@nestjs/common';
import { SugestaoUsuarioService } from './susgestao-usuario.service';
import { SugestaoUsuarioController } from './susgestao-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SugestaoUsuarioHistoricoRepository } from '../sugestao-usuario-historico/sugestao-usuario-historico.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SugestaoUsuarioRepository, EscolaRepository, SugestaoUsuarioHistoricoRepository])],
  providers: [SugestaoUsuarioService],
  controllers: [SugestaoUsuarioController]
})
export class SugestaoUsuarioModule { }
