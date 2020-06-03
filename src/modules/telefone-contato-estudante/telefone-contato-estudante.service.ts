import { TelefoneContatoEstudante } from './telefone-contato-estudante.entity';
import { TelefoneContatoEstudanteRepository } from './telefone-contato-estudante.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TelefoneContatoEstudanteService {
  constructor(@InjectRepository(TelefoneContatoEstudanteRepository) private telefoneContatoEstudanteRepository: TelefoneContatoEstudanteRepository) { }

  public inserir(telefones: TelefoneContatoEstudante[]): Promise<TelefoneContatoEstudante[]> {
    return new Promise((resolve, reject) => {
      this.telefoneContatoEstudanteRepository.save(telefones).then(telefonesInseridos => {
        resolve(telefonesInseridos);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listar(est_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'tce_id_int as id',
        'tce_telefone_int as telefone',
        'est_id_int as est_id'
      ];
      this.telefoneContatoEstudanteRepository.createQueryBuilder('tco')
        .select(campos)
        .where('tco.est_id_int = :est_id', { est_id: est_id })
        .execute()
        .then(telefonesContato => {
          resolve(telefonesContato);
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public excluir(est_id: any): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.telefoneContatoEstudanteRepository
        .createQueryBuilder('tce')
        .delete()
        .where('est_id_int = :est_id', est_id)
        .execute()
        .then(deleteResult => {
          resolve(deleteResult)
        }).catch(reason => {
          reject(reason);
        });
    })
  }

}
