import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegraAlertaRepository } from './regra-alerta.repository';
import { RegraAlerta } from './regra-alerta.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class RegraAlertaService {
  constructor(@InjectRepository(RegraAlertaRepository) private regraAlertaRepository: RegraAlertaRepository) { }

  public inserir(regraAlerta: RegraAlerta): Promise<RegraAlerta> {
    return new Promise((resolve, reject) => {
      this.regraAlertaRepository.save(regraAlerta).then(novaRegraAlerta => {
        resolve(novaRegraAlerta);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listar(esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'ral.ral_id_int as ral_id', 'ral.ral_valor_referencia_int as valor_referencia',
        'ral.opa_id_int as opa_id', 'opa.opa_operador_txt as operador',
        'ral.tod_id_int as tod_id', 'tod.tod_tipo_ocorrencia_txt as tipo_ocorrencia',
        'ral.usr_id_int as usr_id', 'usr.usr_nome_txt as usuario',
        'ral.ral_data_criacao_dte as data_criacao', 'ral.esc_id_int as esc_id',
        'esc.esc_nome_txt as escola', 'ral.ral_data_inicio_dte as data_inicio',
        'ral.ral_data_fim_dte as data_fim'
      ];
      this.regraAlertaRepository.createQueryBuilder('ral').select(campos)
        .innerJoin('ral.operadorAlerta', 'opa')
        .innerJoin('ral.tipoOcorrenciaDisciplinar', 'tod')
        .innerJoin('ral.usuario', 'usr')
        .innerJoin('ral.escola', 'esc')
        .execute()
        .then(regrasAlertas => {
          resolve(regrasAlertas);
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public alterar(regraAlerta: RegraAlerta): Promise<RegraAlerta> {
    console.log(regraAlerta);
    return new Promise((resolve, reject) => {
      this.regraAlertaRepository.save(regraAlerta).then(novaRegraAlerta => {
        resolve(novaRegraAlerta);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public excluir(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.regraAlertaRepository.delete(id).then(deleteResult => {
        resolve(deleteResult);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

}
