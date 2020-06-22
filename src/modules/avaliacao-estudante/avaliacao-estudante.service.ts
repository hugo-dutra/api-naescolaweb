import { AvaliacaoEstudanteRepository } from './avaliacao-estudante.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AvaliacaoEstudanteService {
  constructor(@InjectRepository(AvaliacaoEstudanteRepository) private avaliacaoEstudanteRepository: AvaliacaoEstudanteRepository) { }

  public listarPorDiarioAvaliacaoId(dav_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'ave.ave_id_int as ave_id', 'ave.ave_valor_float as valor',
        'ave.dav_id_int as dav_id', 'ave.est_id_int as est_id',
        'est.est_nome_txt as estudante', 'est.est_matricula_txt as matricula'
      ];
      this.avaliacaoEstudanteRepository.createQueryBuilder('ave')
        .select(campos)
        .innerJoin('ave.estudante', 'est')
        .where('ave.dav_id_int = :dav_id', { dav_id: dav_id })
        .orderBy('est_nome_txt', 'ASC')
        .execute()
        .then(avaliacoes => {
          resolve(avaliacoes);
        }).catch(reason => {
          reject(reason)
        });
    })
  }


}
