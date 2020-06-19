import { DiarioAvaliacao } from './diario-avaliacao.entity';
import { DiarioAvaliacaoRepository } from './diario-avaliacao.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvaliacaoEstudanteRepository } from '../avaliacao-estudante/avaliacao-estudante.repository';

@Injectable()
export class DiarioAvaliacaoService {
  constructor(
    @InjectRepository(DiarioAvaliacaoRepository) private diarioAvaliacaoRepository: DiarioAvaliacaoRepository,
    @InjectRepository(AvaliacaoEstudanteRepository) private avaliacaoEstudanteRepository: AvaliacaoEstudanteRepository,
  ) { }

  public inserirDiarioAvaliacao(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const diarioAvaliacao = new DiarioAvaliacao();
      diarioAvaliacao.data = new Date(dados['data_avaliacao'] + ' 00:00:00');
      diarioAvaliacao.dip_id = dados['dip_id'];
      diarioAvaliacao.metodologia = dados['metodologia'];
      diarioAvaliacao.objetivo = dados['objetivo'];
      diarioAvaliacao.prl_id
      const estudantesAvaliados: any[] = dados['estudantes_avaliados'];
      // sp_dav_inserir
      //sp_ave_inserir







      console.log(dados);
      resolve();
    })
  }
}
