import { SugestaoUsuarioHistoricoRepository } from './sugestao-usuario-historico.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SugestaoUsuarioHistoricoService {
  constructor(@InjectRepository(SugestaoUsuarioHistoricoRepository) private sugestaoUsuarioHistoricoRepository: SugestaoUsuarioHistoricoRepository) { }

  public listar(sus_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'suh.suh_id_int as suh_id', 'suh.suh_status_modificado_int as valor_status',
        '0 as status', 'suh.suh_data_alteracao_dte as data',
        'suh.suh_observacao_txt as observacao', 'suh.sus_id_int as sus_id',
        'suh.usr_id_int as usr_id', 'usr.usr_nome_txt as usuario'
      ];
      this.sugestaoUsuarioHistoricoRepository.createQueryBuilder('suh')
        .select(campos)
        .innerJoin('suh.usuario', 'usr')
        .where('suh.sus_id_int = :sus_id', { sus_id: sus_id })
        .execute()
        .then((historico: any[]) => {
          resolve(historico);
        }).catch(reason => {
          reject(reason)
        })
    })
  }


}
