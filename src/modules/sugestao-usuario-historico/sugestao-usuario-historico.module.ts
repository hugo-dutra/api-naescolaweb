import { Module } from '@nestjs/common';
import { SugestaoUsuarioHistoricoService } from './sugestao-usuario-historico.service';
import { SugestaoUsuarioHistoricoController } from './sugestao-usuario-historico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SugestaoUsuarioHistoricoRepository } from './sugestao-usuario-historico.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SugestaoUsuarioHistoricoRepository])],
  providers: [SugestaoUsuarioHistoricoService],
  controllers: [SugestaoUsuarioHistoricoController]
})
export class SugestaoUsuarioHistoricoModule { }
