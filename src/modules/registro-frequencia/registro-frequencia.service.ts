import { RegistroFrequenciaRepository } from './registro-frequencia.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegistroFrequenciaService {
  constructor(@InjectRepository(RegistroFrequenciaRepository) private registroFrequenciaRepository: RegistroFrequenciaRepository) { }

  public listar(rdi_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'ref.ref_id_int as ref_id', 'ref.est_id_int as est_id',
        'est.est_matricula_txt as matricula', 'est.est_nome_txt as estudante',
        'ref.ref_data_hora_dtm as data_hora', 'ref.ref_presente_int as presente',
        'ref.ref_status_push_int as status_push', 'ref.rdi_id_int as rdi_id'
      ];
      this.registroFrequenciaRepository
        .createQueryBuilder('ref')
        .select(campos)
        .innerJoin('ref.estudante', 'est')
        .where('ref.rdi_id_int = :rdi_id', { rdi_id: rdi_id })
        .execute()
        .then((registrosFrequencia: any[]) => {
          resolve(registrosFrequencia);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public alterar(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.registroFrequenciaRepository
        .createQueryBuilder('ref')
        .update({ presente: dados['presente'] })
        .where('ref_id_int = :ref_id', { ref_id: dados['ref_id'] })
        .execute()
        .then(updateResult => {
          resolve()
        }).catch(reason => {
          reject(reason);
        });
    })
  }
}
