import { DiarioObservacaoEstudanteRepository } from './diario-observacao-estudante.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DiarioObservacaoEstudanteService } from './diario-observacao-estudante.service';
import { DiarioObservacaoEstudanteController } from './diario-observacao-estudante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DiarioObservacaoEstudanteRepository])],
  providers: [DiarioObservacaoEstudanteService],
  controllers: [DiarioObservacaoEstudanteController]
})
export class DiarioObservacaoEstudanteModule { }
