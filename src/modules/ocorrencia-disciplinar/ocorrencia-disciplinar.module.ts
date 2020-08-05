import { PeriodoLetivoRepository } from './../periodo-letivo/periodo-letivo.repository';
import { TipoOcorrenciaDisciplinarRepository } from './../tipo-ocorrencia-disciplinar/tipo-ocorrencia-disciplinar.repository';
import { EstudanteRepository } from './../estudante/estudante.repository';
import { EstudanteModule } from './../estudante/estudante.module';
import { Module } from '@nestjs/common';
import { OcorrenciaDisciplinarService } from './ocorrencia-disciplinar.service';
import { OcorrenciaDisciplinarController } from './ocorrencia-disciplinar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OcorrenciaDisciplinarRespository } from './ocorrencia-disciplinar.repository';
import { AlertaOcorrenciaVerificadaRepository } from '../alerta-ocorrencia-verificada/alerta-ocorrencia-verificada.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OcorrenciaDisciplinarRespository, EstudanteRepository, AlertaOcorrenciaVerificadaRepository, TipoOcorrenciaDisciplinarRepository, PeriodoLetivoRepository])],
  providers: [OcorrenciaDisciplinarService],
  controllers: [OcorrenciaDisciplinarController]
})
export class OcorrenciaDisciplinarModule { }
