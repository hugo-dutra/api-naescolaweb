import { TipoMedidaAvaliacao } from './../tipo-medida-avaliacao/tipo-medida-avaliacao.entity';
import { TipoMedidaAvaliacaoRepository } from './tipo-medida-avaliacao.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class TipoMedidaAvaliacaoService {
  constructor(@InjectRepository(TipoMedidaAvaliacaoRepository) private tipoMedidaAvaliacaoRepository: TipoMedidaAvaliacaoRepository) { }

  public listar(): Promise<TipoMedidaAvaliacao[]> {
    return new Promise((resolve, reject) => {
      const campos = ['tma_id_int as id, tma_nome_txt as nome'];
      this.tipoMedidaAvaliacaoRepository.createQueryBuilder('tma')
        .select(campos)
        .execute()
        .then((retorno: TipoMedidaAvaliacao[]) => {
          resolve(retorno);
        }).catch(reason => {
          reject(reason)
        })
    })
  }


}
