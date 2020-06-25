import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FrequenciaPortariaRepository } from './frequencia-portaria.repository';
import { EstudanteRepository } from '../estudante/estudante.repository';

@Injectable()
export class FrequenciaPortariaService {
  constructor(
    @InjectRepository(FrequenciaPortariaRepository) private frequenciaPortariaRepository: FrequenciaPortariaRepository,
    @InjectRepository(EstudanteRepository) private estudanteRepository: EstudanteRepository,
  ) { }

  public listarPresentesTurmaDataTipoMovimentacao(trm_id: number, data: Date, tipo_movimentacao: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'frp.est_id_int as est_id'
      ];
      this.frequenciaPortariaRepository.createQueryBuilder('frp')
        .select(campos)
        .innerJoin('frp.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .where('frp.frp_data_dtm = date(:data)', { data: data })
        .andWhere('trm.trm_id_int = :trm_id', { trm_id: trm_id })
        .andWhere('frp.frp_tipo_movimentacao = :tipo_movimentacao', { tipo_movimentacao: tipo_movimentacao })
        .andWhere('etu.etu_turma_atual_int = 1')
        .execute()
        .then(presentes => {
          resolve(presentes);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarVerificarPercentualTurma(trm_id: number, ano_letivo: number, tipo_movimentacao: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const diasLetivos = [
        'count(distinct(frp_data_dtm)) as dias_letivos'
      ];
      const currentMonth = new Date().getMonth() + 1;
      const currentDay = new Date().getDate();
      const dataInicial = `${ano_letivo}-01-01`;
      const dataFinal = `${ano_letivo}-${currentMonth}-${currentDay}`;
      this.frequenciaPortariaRepository.createQueryBuilder('frp')
        .select(diasLetivos)
        .where('frp_tipo_movimentacao = 0')
        .andWhere('date(frp_data_dtm) >= :dataInicial', { dataInicial: new Date(dataInicial) })
        .andWhere('date(frp_data_dtm) <= :dataFinal', { dataFinal: new Date(dataFinal) })
        .execute()
        .then(diasLetivosEncontrados => {
          const diasLetivos = diasLetivosEncontrados[0]['dias_letivos']
          const campos = [
            'frp.est_id_int as est_id',
            'count(frp.est_id_int) as presencas',
            `abs(${diasLetivos} - count(frp.est_id_int)) as faltas`
          ]
          this.frequenciaPortariaRepository.createQueryBuilder('frp')
            .select(campos)
            .innerJoin('frp.estudante', 'est')
            .innerJoin('est.estudantesTurmas', 'etu')
            .innerJoin('etu.turma', 'trm')
            .where('trm.trm_id_int = :trm_id', { trm_id: trm_id })
            .andWhere('frp.frp_tipo_movimentacao = :tipo_movimentacao', { tipo_movimentacao: tipo_movimentacao })
            .groupBy('frp.est_id_int')
            .execute()
            .then(frequenciaTurma => {
              resolve(frequenciaTurma);
            }).catch(reason => {
              reject(reason);
            });

        }).catch(reason => {
          reject(reason);
        })
    });
  }

  public listarFrequenciaPeriodo(data_inicio: Date, data_fim: Date, tipo_movimentacao: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'count(frp.est_id_int) as quantidade',
        'date(frp.frp_data_dtm) as data'
      ];
      this.frequenciaPortariaRepository.createQueryBuilder('frp')
        .select(campos)
        .innerJoin('frp.estudante', 'est')
        .innerJoin('est.escola', 'esc')
        .where('date(frp.frp_data_dtm) >= date(:data_inicio)', { data_inicio: data_inicio })
        .andWhere('date(frp.frp_data_dtm) <= date(:data_fim)', { data_fim: data_fim })
        .andWhere('frp_tipo_movimentacao = :tipo_movimentacao', { tipo_movimentacao: tipo_movimentacao })
        .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .groupBy('frp.frp_data_dtm')
        .orderBy('frp.frp_data_dtm', 'ASC')
        .execute()
        .then((frequencias: any[]) => {
          resolve(frequencias);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarHistoricoEntradaSaida(est_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'frp_data_dtm as dia_letivo',
        'frp_data_dtm as data_registro',
        'frp_hora_tmr as hora',
        'frp.frp_tipo_movimentacao as tipo_movimentacao',
        'por.por_nome_txt as portaria'
      ];
      this.frequenciaPortariaRepository.createQueryBuilder('frp')
        .select(campos)
        .innerJoin('frp.portaria', 'por')
        .where('frp.est_id_int = :est_id', { est_id: est_id })
        .execute()
        .then((frequencias: any[]) => {
          frequencias = frequencias.map(frequencia => {
            switch (frequencia['tipo_movimentacao']) {
              case 0:
                frequencia['tipo_movimentacao'] = 'Entrada';
                break;
              case 1:
                frequencia['tipo_movimentacao'] = 'Saída';
                break;
              default:
                break;
            }
            return frequencia;
          });
          resolve(frequencias);
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public listarRegistroMaisRecente(esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        `date(frp.frp_data_dtm - INTERVAL '3 DAY') as data`
      ];
      this.frequenciaPortariaRepository.createQueryBuilder('frp')
        .select(campos)
        .innerJoin('frp.portaria', 'por')
        .innerJoin('por.escola', 'esc')
        .where('por.esc_id_int = :esc_id', { esc_id: esc_id })
        .limit(1)
        .orderBy('frp_data_dtm', 'DESC')
        .execute()
        .then(ultimoRegistro => {
          resolve(ultimoRegistro);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarAbsenteismoTotalTurma(trm_id: number, esc_id: number, data_inicio: Date, data_fim: Date, limite: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const diasLetivos = [
        'count(distinct(frp_data_dtm)) as dias_letivos'
      ];
      this.frequenciaPortariaRepository.createQueryBuilder('frp')
        .select(diasLetivos)
        .where('frp_tipo_movimentacao = 0')
        .andWhere('date(frp_data_dtm) >= :dataInicial', { dataInicial: data_inicio })
        .andWhere('date(frp_data_dtm) <= :dataFinal', { dataFinal: data_fim })
        .execute()
        .then(diasLetivosEncontrados => {
          const diasLetivos = diasLetivosEncontrados[0]['dias_letivos']
          if (diasLetivos > 0) {
            const campos = [
              'est.est_id_int as est_id', 'est.est_nome_txt as nome',
              'est.est_matricula_txt as matricula',
              `${diasLetivos} - (select count(est_id_int) from frequencia_portaria_frp where frequencia_portaria_frp.est_id_int = est.est_id_int and frequencia_portaria_frp.frp_tipo_movimentacao = 0) as faltas`,
              `(select count(est_id_int) from frequencia_portaria_frp where frequencia_portaria_frp.est_id_int = est.est_id_int and frequencia_portaria_frp.frp_tipo_movimentacao = 0) as presencas`,
              'est.est_foto_txt as foto', 'ete.ete_abreviatura_txt as etapa',
              'sre.sre_abreviatura_txt as serie', 'trm.trm_nome_txt as turma',
              'trn.trn_abreviatura_txt as turno'
            ]
            if (trm_id == 0 || undefined) {
              this.estudanteRepository.createQueryBuilder('est')
                .select(campos)
                .innerJoin('est.escola', 'esc')
                .innerJoin('est.estudantesTurmas', 'etu')
                .innerJoin('etu.turma', 'trm')
                .innerJoin('trm.serie', 'sre')
                .innerJoin('trm.turno', 'trn')
                .innerJoin('sre.etapaEnsino', 'ete')
                .where('etu.etu_turma_atual_int = 1')
                .andWhere('est.esc_id_int = :esc_id', { esc_id: esc_id })
                .limit(limite)
                .execute()
                .then((frequencias: any[]) => {
                  frequencias.sort((a, b) => {
                    return a['faltas'] > b['faltas'] ? 1 : -1;
                  })
                  resolve(frequencias);
                }).catch(reason => {
                  reject(reason);
                });
            } else {
              this.estudanteRepository.createQueryBuilder('est')
                .select(campos)
                .innerJoin('est.escola', 'esc')
                .innerJoin('est.estudantesTurmas', 'etu')
                .innerJoin('etu.turma', 'trm')
                .innerJoin('trm.serie', 'sre')
                .innerJoin('trm.turno', 'trn')
                .innerJoin('sre.etapaEnsino', 'ete')
                .where('etu.etu_turma_atual_int = 1')
                .andWhere('trm.trm_id_int = :trm_id', { trm_id: trm_id })
                .limit(limite)
                .execute()
                .then((frequencias: any[]) => {
                  frequencias.sort((a, b) => {
                    return a['faltas'] > b['faltas'] ? 1 : -1;
                  })
                  resolve(frequencias);
                }).catch(reason => {
                  reject(reason);
                });
            }
          } else {
            resolve([]);
          }
        });
    })
  }
}
