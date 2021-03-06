import { PeriodoLetivoRepository } from './../periodo-letivo/periodo-letivo.repository';
import { RegistroFrequenciaRepository } from './../registro-frequencia/registro-frequencia.repository';
import { AvaliacaoEstudanteRepository } from './avaliacao-estudante.repository';
import { Module } from '@nestjs/common';
import { AvaliacaoEstudanteService } from './avaliacao-estudante.service';
import { AvaliacaoEstudanteController } from './avaliacao-estudante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AvaliacaoEstudanteRepository, RegistroFrequenciaRepository, PeriodoLetivoRepository])],
  providers: [AvaliacaoEstudanteService],
  controllers: [AvaliacaoEstudanteController]
})
export class AvaliacaoEstudanteModule { }
