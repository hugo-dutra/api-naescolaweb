import { EstudanteRepository } from './../estudante/estudante.repository';
import { EstudanteModule } from './../estudante/estudante.module';
import { Module } from '@nestjs/common';
import { OcorrenciaDisciplinarService } from './ocorrencia-disciplinar.service';
import { OcorrenciaDisciplinarController } from './ocorrencia-disciplinar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OcorrenciaDisciplinarRespository } from './ocorrencia-disciplinar.repository';
import { AlertaOcorrenciaVerificadaRepository } from '../alerta-ocorrencia-verificada/alerta-ocorrencia-verificada.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OcorrenciaDisciplinarRespository, EstudanteRepository, AlertaOcorrenciaVerificadaRepository])],
  providers: [OcorrenciaDisciplinarService],
  controllers: [OcorrenciaDisciplinarController]
})
export class OcorrenciaDisciplinarModule { }
