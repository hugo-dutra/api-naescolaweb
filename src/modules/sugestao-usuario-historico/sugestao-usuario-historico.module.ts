import { Module } from '@nestjs/common';
import { SugestaoUsuarioHistoricoService } from './sugestao-usuario-historico.service';
import { SugestaoUsuarioHistoricoController } from './sugestao-usuario-historico.controller';

@Module({
  providers: [SugestaoUsuarioHistoricoService],
  controllers: [SugestaoUsuarioHistoricoController]
})
export class SugestaoUsuarioHistoricoModule {}
