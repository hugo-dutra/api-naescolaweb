import { ObservacaoAlertaOcorrenciaVerificada } from './observacao-alerta-ocorrencia-verificada.entity';
import { ObservacaoAlertaOcorrenciaVerificadaRepository } from './observacao-alerta-ocorrencia-verificada.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ObservacaoAlertaOcorrenciaVerificadaService {
  constructor(@InjectRepository(ObservacaoAlertaOcorrenciaVerificadaRepository) private observacaoAlertaOcorrenciaVerificadaRepository: ObservacaoAlertaOcorrenciaVerificadaRepository) { }

  public inserir(dados: any): Promise<any> {
    const observacaoAlertaOcorrenciaVerificada = new ObservacaoAlertaOcorrenciaVerificada()
    observacaoAlertaOcorrenciaVerificada.observacao = dados['observacao'];
    observacaoAlertaOcorrenciaVerificada.data_verificacao = dados['data_verificacao'];
    return new Promise((resolve, reject) => {
      this.observacaoAlertaOcorrenciaVerificadaRepository.save(observacaoAlertaOcorrenciaVerificada).then(novaObservacao => {
        resolve({ oov_id: novaObservacao.id });
      }).catch(reason => {
        reject(reason);
      });
    });
  }

}
