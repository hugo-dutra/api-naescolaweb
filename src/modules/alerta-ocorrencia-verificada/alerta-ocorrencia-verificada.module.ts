import { AlertaOcorrenciaVerificadaRepository } from './alerta-ocorrencia-verificada.repository';
import { Module } from '@nestjs/common';
import { AlertaOcorrenciaVerificadaService } from './alerta-ocorrencia-verificada.service';
import { AlertaOcorrenciaVerificadaController } from './alerta-ocorrencia-verificada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OcorrenciaDisciplinarRespository } from '../ocorrencia-disciplinar/ocorrencia-disciplinar.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlertaOcorrenciaVerificadaRepository, OcorrenciaDisciplinarRespository])],
  providers: [AlertaOcorrenciaVerificadaService],
  controllers: [AlertaOcorrenciaVerificadaController]
})
export class AlertaOcorrenciaVerificadaModule { }
