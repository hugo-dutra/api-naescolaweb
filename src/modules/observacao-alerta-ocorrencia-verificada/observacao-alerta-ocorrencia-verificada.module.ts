import { ObservacaoAlertaOcorrenciaVerificadaRepository } from './observacao-alerta-ocorrencia-verificada.repository';
import { Module } from '@nestjs/common';
import { ObservacaoAlertaOcorrenciaVerificadaService } from './observacao-alerta-ocorrencia-verificada.service';
import { ObservacaoAlertaOcorrenciaVerificadaController } from './observacao-alerta-ocorrencia-verificada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ObservacaoAlertaOcorrenciaVerificadaRepository])],
  providers: [ObservacaoAlertaOcorrenciaVerificadaService],
  controllers: [ObservacaoAlertaOcorrenciaVerificadaController]
})
export class ObservacaoAlertaOcorrenciaVerificadaModule { }
