import { OcorrenciaDisciplinarRespository } from './../ocorrencia-disciplinar/ocorrencia-disciplinar.repository';
import { AlertaOcorrenciaVerificadaRepository } from './alerta-ocorrencia-verificada.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertaOcorrenciaVerificada } from './alerta-ocorrencia-verificada.entity';

@Injectable()
export class AlertaOcorrenciaVerificadaService {
  constructor(
    @InjectRepository(AlertaOcorrenciaVerificadaRepository) private alertaOcorrenciaVerificadaRepository: AlertaOcorrenciaVerificadaRepository,
    @InjectRepository(OcorrenciaDisciplinarRespository) private ocorrenciaDisciplinarRespository: OcorrenciaDisciplinarRespository) { }

  public inserir(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const est_id = dados['est_id'];
      const tod_id = dados['tod_id'];
      const usr_id = dados['usr_id'];
      const esc_id = dados['esc_id'];
      const data_inicio_considerado = dados['data_inicio_considerado'];
      const data_fim_considerado = dados['data_fim_considerado'];
      const oov_id = dados['oov_id'];
      const campos = [
        'ocd_id_int'
      ];
      this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
        .select(campos)
        .where('ocd.tod_id_int = :tod_id', { tod_id: tod_id })
        .andWhere('ocd.est_id_int = :est_id', { est_id: est_id })
        .andWhere('ocd.ocd_data_hora_dtm >= :data_inicio_considerado', { data_inicio_considerado: data_inicio_considerado })
        .andWhere('ocd.ocd_data_hora_dtm <= :data_fim_considerado', { data_fim_considerado: data_fim_considerado })
        .execute()
        .then((ocorrencias: any[]) => {
          const alertasOcorrenciasVerificadas = new Array<AlertaOcorrenciaVerificada>();
          ocorrencias.forEach(ocorrencia => {
            const alertaOcorrenciaVerificada = new AlertaOcorrenciaVerificada();
            const ocd_id = ocorrencia['ocd_id_int'];
            alertaOcorrenciaVerificada.esc_id = esc_id;
            alertaOcorrenciaVerificada.ocd_id = ocd_id;
            alertaOcorrenciaVerificada.oov_id = oov_id;
            alertaOcorrenciaVerificada.usr_id = usr_id
            alertasOcorrenciasVerificadas.push(alertaOcorrenciaVerificada);
          })
          this.alertaOcorrenciaVerificadaRepository.save(alertasOcorrenciasVerificadas).then(novosAlertasOcorrenciasVerificadas => {
            resolve();
          }).catch(reason => {
            reject(reason);
          });
          resolve();
        }).catch(reason => {
          reject(reason);
        });
    })
  }

}
