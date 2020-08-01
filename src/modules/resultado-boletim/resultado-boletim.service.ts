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
              console.log(resultadosBoletins);
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
