import { Injectable } from '@nestjs/common';
import { ResultadoBoletimRepository } from './resultado-boletim.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultadoBoletim } from './resultado-boletim.entity';

@Injectable()
export class ResultadoBoletimService {
  constructor(@InjectRepository(ResultadoBoletimRepository) private resultadoBoletimRepository: ResultadoBoletimRepository) { }

  public inserir(resultadosConsolidados: ResultadoBoletim[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const resultadosBoletins = new Array<any>();
      resultadosConsolidados.forEach(resultadoConsolidado => {
        const resultado = new ResultadoBoletim();
        resultado.bes_id = resultadoConsolidado['bes_id'];
        resultado.dsp_id = resultadoConsolidado['dsp_id'];
        resultado.prl_id = resultadoConsolidado['prl_id'];
        resultado.falta = resultadoConsolidado['reb_falta'];
        resultado.nota = resultadoConsolidado['reb_nota'];
        this.verificarExistencia(resultado).then(resultadoEncontrado => {
          if (resultadoEncontrado) {
            resultado.id = resultadoEncontrado.id;
            resultadosBoletins.push(resultado);
          } else {
            resultadosBoletins.push(resultado);
          }
          if (resultadosBoletins.length == resultadosConsolidados.length) {
            this.resultadoBoletimRepository.save(resultadosBoletins).then(() => {
              resolve();
            })
          }
        })
      })
    })
  }

  public listarEstudantesDestaque(prl_id: number, nota_corte: number, esc_id: number, quantidade_dsp: number, ree_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'est.est_id_int as est_id', 'est.est_matricula_txt as matricula',
        'est.est_nome_txt as nome', '0 as quantidade_disciplinas',
        'sre.sre_abreviatura_txt as serie', 'trm.trm_nome_txt as turma',
        'trn.trn_nome_txt as turno', 'ete.ete_abreviatura_txt as etapa',
        'est.est_foto_txt as foto'
      ]
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select(campos)
        .innerJoin('reb.disciplina', 'dsp')
        .innerJoin('reb.periodoLetivo', 'prl')
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('bes.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('sre.etapaEnsino', 'ete')
        .innerJoin('trm.turno', 'trn')
        .where('prl.prl_id_int = :prl_id', { prl_id: prl_id })
        .andWhere('reb.reb_nota_num >= :nota_corte', { nota_corte: nota_corte })
        .andWhere('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('est.est_nome_txt', 'ASC')
        .orderBy('dsp.dsp_nome_txt', 'ASC')
        .execute()
        .then((destaques: any[]) => {
          let resultados = [];
          destaques.reduce((res, value) => {
            if (!res[value.est_id]) {
              res[value.est_id] = value;
              resultados.push(res[value.est_id])
            }
            res[value.est_id].quantidade_disciplinas += 1;
            return res;
          }, {});
          resultados = resultados.filter((res: any) => res['quantidade_disciplinas'] >= quantidade_dsp);
          resolve(resultados)
        }).catch(reason => {
          reject(reason);
        })
    })
  }

  public listarInfrequentes(esc_id: number, trm_id: number, minimo_faltas: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.contarPeriodosFechados(esc_id).then(periodosFechados => {
        if (periodosFechados) {
          if (trm_id == 0) {
            this.listarInfrequentesTodasTurmas(esc_id, minimo_faltas, periodosFechados).then(infrequentes => {
              resolve(infrequentes);
            }).catch(reason => {
              reject(reason)
            })
          } else {
            this.listarInfrequentesPorTurma(esc_id, trm_id, minimo_faltas, periodosFechados).then(infrequentes => {
              resolve(infrequentes);
            }).catch(reason => {
              reject(reason);
            })
          }
        } else {
          resolve([]);
        }
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public listarRendimentoTurmaPeriodo(trm_id: number, prl_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'dsp.dsp_abreviatura_txt as disciplina_abv', 'dsp.dsp_nome_txt as disciplina',
        'reb.reb_nota_num as nota', 'reb.reb_falta_int as faltas',
        'est.est_id_int as est_id', 'est.est_nome_txt as nome',
        'est.est_foto_txt as foto', 'prl.prl_periodo_txt as periodo',
        'prl.prl_inicio_dte as inicio_periodo', 'prl.prl_fim_dte as fim_periodo'
      ]
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select(campos)
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('bes.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('reb.disciplina', 'dsp')
        .innerJoin('reb.periodoLetivo', 'prl')
        .where('trm.trm_id_int = :trm_id', { trm_id: trm_id })
        .andWhere('reb.prl_id_int = :prl_id', { prl_id: prl_id })
        .andWhere('est.esc_id_int = trm.esc_id_int')
        .andWhere('etu.etu_turma_atual_int = 1')
        .orderBy('dsp.dsp_nome_txt', 'ASC')
        .execute()
        .then((resultados: any[]) => {
          resultados = resultados.sort((a, b) => a.nome > b.nome ? 1 : -1);
          resolve(resultados)
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarRendimentoAreaConhecimentoTurmaPeriodo(trm_id: number, prl_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'avg(reb.reb_nota_num) as media', 'est.est_id_int as est_id',
        'est.est_nome_txt as nome', 'arc.arc_nome_txt as area_conhecimento',
        'arc.arc_abreviatura_txt as area_conhecimento_abv'
      ]
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select(campos)
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('reb.disciplina', 'dsp')
        .innerJoin('dsp.areaConhecimento', 'arc')
        .innerJoin('bes.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('reb.periodoLetivo', 'prl')
        .where('trm.trm_id_int = :trm_id', { trm_id: trm_id })
        .andWhere('prl.prl_id_int = :prl_id', { prl_id: prl_id })
        .groupBy('est.est_id_int')
        .addGroupBy('arc.arc_id_int')
        .orderBy('est.est_id_int', 'ASC')
        .orderBy('arc.arc_abreviatura_txt', 'ASC')
        .execute()
        .then((resultados: any[]) => {
          resolve(resultados);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarRendimentoFaltasEstudantePeriodo(est_id: number, prl_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'bes.est_id_int as est_id', 'dsp.dsp_abreviatura_txt as disciplina',
        'reb.reb_nota_num as nota', 'reb.reb_falta_int as falta'
      ]
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select(campos)
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('bes.estudante', 'est')
        .innerJoin('reb.periodoLetivo', 'prl')
        .innerJoin('reb.disciplina', 'dsp')
        .where('bes.est_id_int = :est_id', { est_id: est_id })
        .andWhere('prl.prl_id_int = :prl_id', { prl_id: prl_id })
        .orderBy('dsp.dsp_abreviatura_txt', 'ASC')
        .execute()
        .then((rendimentos: any[]) => {
          resolve(rendimentos);
        }).catch(reason => {
          reject(reason)
        });
    })
  }

  public listarAproveitamentoDisciplinaTurmaPeriodo(trm_id: number, nota_corte: number, prl_id: number, tipo_resultado: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (tipo_resultado === 'a') {
        this.listarAprovadosDisciplinaTurmaPeriodo(trm_id, nota_corte, prl_id).then(aprovados => {
          resolve(aprovados)
        }).catch(reason => {
          reject(reason);
        })
      }
      if (tipo_resultado === 'r') {
        this.listarRecuperadosDisciplinaTurmaPeriodo(trm_id, nota_corte, prl_id).then(recuperacao => {
          resolve(recuperacao)
        }).catch(reason => {
          reject(reason);
        })
      }
    })
  }

  public listarAproveitamentoProfessorDisciplinaPeriodo(nota_corte: number, prd_id: number, prl_id: number, tipo_resultado: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (tipo_resultado === 'a') {
        this.listarAprovadosProfessorDisciplinaPeriodo(prd_id, nota_corte, prl_id).then(aprovados => {
          resolve(aprovados)
        }).catch(reason => {
          reject(reason);
        })
      }
      if (tipo_resultado === 'r') {
        this.listarRecuperadosProfessorDisciplinaPeriodo(prd_id, nota_corte, prl_id).then(recuperacao => {
          resolve(recuperacao)
        }).catch(reason => {
          reject(reason);
        })
      }
    })
  }

  public listarAprovadosProfessorDisciplinaPeriodo(prd_id: number, nota_corte: number, prl_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        '0 as quantidade', 'sre.sre_abreviatura_txt as serie',
        'trm.trm_nome_txt as turma', 'trn.trn_abreviatura_txt as turno',
        'ete.ete_abreviatura_txt as etapa', 'trm.trm_id_int as trm_id'
      ];
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select(campos)
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('bes.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.professoresTurmas', 'prt')
        .innerJoin('prt.professorDisciplina', 'prd')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('reb.periodoLetivo', 'prl')
        .innerJoin('prd.disciplina', 'dsp')
        .innerJoin('sre.etapaEnsino', 'ete')
        .where('reb.dsp_id_int = prd.dsp_id_int')
        .andWhere('reb.reb_nota_num >= :nota_corte', { nota_corte: nota_corte })
        .andWhere('prd.prd_id_int = :prd_id', { prd_id: prd_id })
        .andWhere('prl.prl_id_int = :prl_id', { prl_id: prl_id })
        .execute()
        .then((aprovados: any[]) => {
          let resultados = [];
          aprovados.reduce((res: any, value: any) => {
            if (!res[value.trm_id]) {
              res[value.trm_id] = value;
              resultados.push(res[value.trm_id])
            }
            res[value.trm_id].quantidade += 1;
            return res;
          }, {});
          resolve(resultados);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarRecuperadosProfessorDisciplinaPeriodo(prd_id: number, nota_corte: number, prl_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        '0 as quantidade', 'sre.sre_abreviatura_txt as serie',
        'trm.trm_nome_txt as turma', 'trn.trn_abreviatura_txt as turno',
        'ete.ete_abreviatura_txt as etapa', 'trm.trm_id_int as trm_id'
      ];
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select(campos)
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('bes.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.professoresTurmas', 'prt')
        .innerJoin('prt.professorDisciplina', 'prd')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('reb.periodoLetivo', 'prl')
        .innerJoin('prd.disciplina', 'dsp')
        .innerJoin('sre.etapaEnsino', 'ete')
        .where('reb.dsp_id_int = prd.dsp_id_int')
        .andWhere('reb.reb_nota_num < :nota_corte', { nota_corte: nota_corte })
        .andWhere('prd.prd_id_int = :prd_id', { prd_id: prd_id })
        .andWhere('prl.prl_id_int = :prl_id', { prl_id: prl_id })
        .execute()
        .then((recuperados: any[]) => {
          let resultados = [];
          recuperados.reduce((res: any, value: any) => {
            if (!res[value.trm_id]) {
              res[value.trm_id] = value;
              resultados.push(res[value.trm_id])
            }
            res[value.trm_id].quantidade += 1;
            return res;
          }, {});
          resolve(resultados);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarAprovadosDisciplinaTurmaPeriodo(trm_id: number, nota_corte: number, prl_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'count(est.est_id_int) as quantidade',
        'dsp.dsp_abreviatura_txt as disciplina'
      ]
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select(campos)
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('bes.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('reb.disciplina', 'dsp')
        .innerJoin('reb.periodoLetivo', 'prl')
        .where('trm.trm_id_int = :trm_id', { trm_id: trm_id })
        .andWhere('reb.reb_nota_num >= :nota_corte', { nota_corte: nota_corte })
        .andWhere('prl.prl_id_int = :prl_id', { prl_id: prl_id })
        .groupBy('dsp.dsp_id_int')
        .execute()
        .then((notas: any[]) => {
          console.log(notas);
          resolve(notas);
        }).catch(reason => {
          reject(reason)
        })
    })
  }

  public listarRecuperadosDisciplinaTurmaPeriodo(trm_id: number, nota_corte: number, prl_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'count(est.est_id_int) as quantidade',
        'dsp.dsp_abreviatura_txt as disciplina'
      ]
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select(campos)
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('bes.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('reb.disciplina', 'dsp')
        .innerJoin('reb.periodoLetivo', 'prl')
        .where('trm.trm_id_int = :trm_id', { trm_id: trm_id })
        .andWhere('reb.reb_nota_num < :nota_corte', { nota_corte: nota_corte })
        .andWhere('prl.prl_id_int = :prl_id', { prl_id: prl_id })
        .groupBy('dsp.dsp_id_int')
        .execute()
        .then((notas: any[]) => {
          console.log(notas);
          resolve(notas);
        }).catch(reason => {
          reject(reason)
        });
    })
  }

  public listarInfrequentesTodasTurmas(esc_id: number, minimo_faltas: number, periodosFechados: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'est.est_id_int as est_id', 'est.est_nome_txt as estudante',
        'trm.trm_id_int as trm_id', 'trm.trm_nome_txt as turma',
        'ete.ete_id_int as ete', 'ete.ete_nome_txt as etapa',
        'sre.sre_id_int as sre_id', 'sre.sre_nome_txt as serie',
        'trn.trn_id_int as trn_id', 'trn.trn_nome_txt as turno',
        'reb.reb_falta_int as faltas', 'est_foto_txt as foto',
        `${minimo_faltas} as minimo_faltas`, `${periodosFechados} as bimestres_fechados`
      ];
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select(campos)
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('bes.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('sre.etapaEnsino', 'ete')
        .innerJoin('reb.periodoLetivo', 'prl')
        .where('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('EXTRACT(YEAR FROM prl.prl_inicio_dte) = :ano', { ano: (new Date().getFullYear()) })
        .execute()
        .then((infrequentes: any[]) => {
          let resultados = [];
          infrequentes.reduce((res, value) => {
            if (!res[value.est_id]) {
              res[value.est_id] = value;
              resultados.push(res[value.est_id])
            }
            res[value.est_id].faltas += value.faltas;
            return res;
          }, {});
          resolve(resultados.sort((a, b) => b.faltas - a.faltas));
        }).catch(reason => {
          reject(reason)
        });
    })
  }

  public listarInfrequentesPorTurma(esc_id: number, trm_id: number, minimo_faltas: number, periodosFechados: number): Promise<any[]> {
    return new Promise((resolve, reject) => {

      const campos = [
        'est.est_id_int as est_id', 'est.est_nome_txt as estudante',
        'trm.trm_id_int as trm_id', 'trm.trm_nome_txt as turma',
        'ete.ete_id_int as ete', 'ete.ete_nome_txt as etapa',
        'sre.sre_id_int as sre_id', 'sre.sre_nome_txt as serie',
        'trn.trn_id_int as trn_id', 'trn.trn_nome_txt as turno',
        'reb.reb_falta_int as faltas', 'est_foto_txt as foto',
        `${minimo_faltas} as minimo_faltas`, `${periodosFechados} as bimestres_fechados`
      ];
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select(campos)
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('bes.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('sre.etapaEnsino', 'ete')
        .innerJoin('reb.periodoLetivo', 'prl')
        .where('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('EXTRACT(YEAR FROM prl.prl_inicio_dte) = :ano', { ano: (new Date().getFullYear()) })
        .andWhere('trm.trm_id_int = :trm_id', { trm_id: trm_id })
        .execute()
        .then((infrequentes: any[]) => {
          let resultados = [];
          infrequentes.reduce((res, value) => {
            if (!res[value.est_id]) {
              res[value.est_id] = value;
              resultados.push(res[value.est_id])
            }
            res[value.est_id].faltas += value.faltas;
            return res;
          }, {});
          resolve(resultados.sort((a, b) => b.faltas - a.faltas));
        }).catch(reason => {
          reject(reason)
        });
    })
  }

  public contarPeriodosFechados(esc_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.resultadoBoletimRepository.createQueryBuilder('reb')
        .select('count(distinct(prl.prl_id_int)) as periodos_fechados')
        .innerJoin('reb.periodoLetivo', 'prl')
        .innerJoin('reb.boletimEscolar', 'bes')
        .innerJoin('bes.estudante', 'est')
        .where('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('EXTRACT(YEAR FROM prl.prl_inicio_dte) = :ano', { ano: (new Date().getFullYear()) })
        .execute()
        .then((periodosFechados: any[]) => {
          if (periodosFechados.length > 0) {
            resolve(periodosFechados[0]['periodos_fechados']);
          } else {
            resolve(undefined);
          }
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public verificarExistencia(resultadoBoletim: ResultadoBoletim): Promise<ResultadoBoletim> {
    return new Promise((resolve, reject) => {
      this.resultadoBoletimRepository.findOne(
        {
          where: {
            bes_id: resultadoBoletim.bes_id,
            dsp_id: resultadoBoletim.dsp_id,
            prl_id: resultadoBoletim.prl_id
          }
        }).then(resultadoBoletimEncontrado => {
          resolve(resultadoBoletimEncontrado)
        }).catch(reason => {
          reject(reason)
        })
    })
  }
}
