import { AvaliacaoEstudante } from './../avaliacao-estudante/avaliacao-estudante.entity';
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
      diarioAvaliacao.valor = dados['valor']
      diarioAvaliacao.peso = dados['peso']
      diarioAvaliacao.prl_id = dados['prl_id']
      const estudantesAvaliados: any[] = dados['estudantes_avaliados'];
      this.diarioAvaliacaoRepository.save(diarioAvaliacao).then(novoDiarioAvaliacao => {
        const dav_id = novoDiarioAvaliacao.id
        const avaliacoesEstudantes = new Array<AvaliacaoEstudante>();
        estudantesAvaliados.forEach(estudanteAvaliado => {
          const avaliacaoEstudante = new AvaliacaoEstudante();
          avaliacaoEstudante.dav_id = dav_id;
          avaliacaoEstudante.est_id = estudanteAvaliado['est_id']
          avaliacaoEstudante.valor = estudanteAvaliado['valor']
          avaliacoesEstudantes.push(avaliacaoEstudante);
        })
        this.avaliacaoEstudanteRepository.save(avaliacoesEstudantes).then(novasAvaliacoesEstudantes => {
          resolve()
        }).catch(reason => {
          reject(reason);
        })
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public listarDiarioAvaliacao(dip_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'dav.dav_id_int as dav_id', 'dav.dav_metodologia_txt as metodologia',
        'dav.dav_objetivo_txt as objetivo', 'date(dav.dav_data_dte) as data',
        'dav.dip_id_int as dip_id', 'dip.dip_diario_txt as diario',
        'dav.dav_valor_num as valor', 'dav.prl_id_int as prl_id',
        'prl.prl_periodo_txt as periodo', 'dav.dav_peso_num as peso'
      ];
      this.diarioAvaliacaoRepository.createQueryBuilder('dav').select(campos)
        .innerJoin('dav.periodoLetivo', 'prl')
        .innerJoin('dav.diarioProfessor', 'dip')
        .where('dav.dip_id_int = :dip_id', { dip_id: dip_id })
        .execute()
        .then(avaliacoes => {
          resolve(avaliacoes)
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public alterarDiarioAvaliacao(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const diarioAvaliacao = new DiarioAvaliacao();
      diarioAvaliacao.id = dados['dav_id'];
      diarioAvaliacao.metodologia = dados['metodologia'];
      diarioAvaliacao.objetivo = dados['objetivo'];
      diarioAvaliacao.data = dados['data'];
      diarioAvaliacao.dip_id = dados['dip_id'];
      diarioAvaliacao.valor = dados['valor'];
      diarioAvaliacao.prl_id = dados['prl_id'];
      diarioAvaliacao.peso = dados['peso'];
      const estudantesAvaliados: any[] = dados['estudantes_avaliados'];
      this.diarioAvaliacaoRepository.save(diarioAvaliacao).then(() => {
        const avaliacoesEstudantes = new Array<AvaliacaoEstudante>();
        estudantesAvaliados.forEach(estudanteAvaliado => {
          const avaliacaoEstudante = new AvaliacaoEstudante();
          avaliacaoEstudante.id = estudanteAvaliado['ave_id'];
          avaliacaoEstudante.valor = estudanteAvaliado['valor'];
          avaliacaoEstudante.dav_id = estudanteAvaliado['dav_id'];
          avaliacaoEstudante.est_id = estudanteAvaliado['est_id'];
          avaliacoesEstudantes.push(avaliacaoEstudante);
        })
        this.avaliacaoEstudanteRepository.save(avaliacoesEstudantes).then(() => {
          resolve()
        }).catch(reason => {
          reject(reason);
        })
      }).catch(reason => {
        reject(reason);
      })
    })
  }
}
