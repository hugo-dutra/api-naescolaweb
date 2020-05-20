import { Module } from '@nestjs/common';
import { DiarioObservacoesGeraisService } from './diario-observacoes-gerais.service';
import { DiarioObservacoesGeraisController } from './diario-observacoes-gerais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiarioObservacoesGerais } from './diario-observacoes-gerais.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiarioObservacoesGerais])],
  providers: [DiarioObservacoesGeraisService],
  controllers: [DiarioObservacoesGeraisController]
})
export class DiarioObservacoesGeraisModule { }
