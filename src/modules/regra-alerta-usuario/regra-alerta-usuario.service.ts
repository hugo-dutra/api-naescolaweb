import { RegraAlertaUsuario } from './regra-alerta-usuario.entity';
import { RegraAlertaUsuarioRepository } from './regra-alerta-usuario.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

@Injectable()
export class RegraAlertaUsuarioService {
  constructor(@InjectRepository(RegraAlertaUsuarioRepository) private regraAlertaUsuarioRepository: RegraAlertaUsuarioRepository) { }

  public inserir(regraAlertaUsuario: RegraAlertaUsuario[]): Promise<RegraAlertaUsuario[]> {
    return new Promise((resolve, reject) => {
      this.regraAlertaUsuarioRepository.save(regraAlertaUsuario).then(novasRegrasAlertaUsuario => {
        resolve(novasRegrasAlertaUsuario);
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public listarPorUsuarioIdEscolaId(usr_id: number, esc_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'ral.ral_id_int as ral_id',
        'tod.tod_id_int as tod_id',
        'tod.tod_tipo_ocorrencia_txt as tipo_ocorrencia',
        'opa.opa_id_int as opa_id',
        'opa.opa_operador_txt as operador',
        'ral.ral_valor_referencia_int as valor_referencia',
        'ral.esc_id_int as esc_id',
        'ral.ral_data_inicio_dte as data_inicio',
        'ral.ral_data_fim_dte as data_fim',
        'ral.usr_id_int as usr_id_criador',
        'usr.usr_nome_txt as usuario_criador',
        'ral.ral_data_criacao_dte as data_criacao'
      ]

      this.regraAlertaUsuarioRepository.createQueryBuilder('rau')
        .select(campos)
        .innerJoin('rau.regraAlerta', 'ral')
        .innerJoin('rau.usuario', 'usr')
        .innerJoin('ral.operadorAlerta', 'opa')
        .innerJoin('ral.tipoOcorrenciaDisciplinar', 'tod')
        .where('rau.usr_id_int = :usr_id', { usr_id: usr_id })
        .andWhere('rau.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then(regrasAlertas => {
          resolve(regrasAlertas);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public excluir(dados: any[]): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      let contaDeletados = 0;
      dados.forEach(dado => {
        this.regraAlertaUsuarioRepository.createQueryBuilder('rau')
          .delete()
          .where('ral_id_int = :ral_id', { ral_id: dado['ral_id'] })
          .andWhere('usr_id_int = :usr_id', { usr_id: dado['usr_id'] })
          .andWhere('esc_id_int = :esc_id', { esc_id: dado['esc_id'] })
          .execute()
          .then(deleteResult => {
            contaDeletados++;
            if (contaDeletados == dados.length) {
              resolve(deleteResult);
            }
          }).catch(reason => {
            reject(reason)
          });
      });
      resolve(null);
    })
  }

}
