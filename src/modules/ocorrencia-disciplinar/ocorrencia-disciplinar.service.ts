import { AlertaOcorrenciaVerificadaRepository } from './../alerta-ocorrencia-verificada/alerta-ocorrencia-verificada.repository';

import { OcorrenciaDisciplinar } from './ocorrencia-disciplinar.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OcorrenciaDisciplinarRespository } from './ocorrencia-disciplinar.repository';
import { EstudanteRepository } from '../estudante/estudante.repository';
import { Utils } from 'src/utils/utils';
import { TipoOcorrenciaDisciplinarRepository } from '../tipo-ocorrencia-disciplinar/tipo-ocorrencia-disciplinar.repository';
import { PeriodoLetivoRepository } from '../periodo-letivo/periodo-letivo.repository';

@Injectable()
export class OcorrenciaDisciplinarService {
  constructor(
    @InjectRepository(OcorrenciaDisciplinarRespository) private ocorrenciaDisciplinarRespository: OcorrenciaDisciplinarRespository,
    @InjectRepository(EstudanteRepository) private estudanteRepository: EstudanteRepository,
    @InjectRepository(AlertaOcorrenciaVerificadaRepository) private alertaOcorrenciaVerificadaRepository: AlertaOcorrenciaVerificadaRepository,
    @InjectRepository(TipoOcorrenciaDisciplinarRepository) private tipoOcorrenciaDisciplinarRepository: TipoOcorrenciaDisciplinarRepository,
    @InjectRepository(PeriodoLetivoRepository) private periodoLetivoRepository: PeriodoLetivoRepository,


  ) { }

  public inserir(dados: any): Promise<OcorrenciaDisciplinar[]> {
    return new Promise((resolve, reject) => {
      const arrayDetalhes = Array.from(dados['array_msg']);
      const tod_id = dados['tod_id'];
      const usr_id = dados['usr_id'];
      const data_hora = dados['data_hora'];
      const ocorrencia = dados['ocorrencia'];
      if (arrayDetalhes.length == 0 || arrayDetalhes == undefined) {
        resolve();
      }
      const arrayDeOcorrenciaDisciplinar = new Array<OcorrenciaDisciplinar>();
      arrayDetalhes.forEach(detalhe => {
        const ocorrenciaDisciplinar = new OcorrenciaDisciplinar();
        ocorrenciaDisciplinar.est_id = parseInt(detalhe['est_id']);
        ocorrenciaDisciplinar.data_hora = data_hora;
        ocorrenciaDisciplinar.firebase_dbkey = detalhe['firebase_dbkey'];
        ocorrenciaDisciplinar.tod_id = tod_id;
        ocorrenciaDisciplinar.usr_id = usr_id;
        ocorrenciaDisciplinar.ocorrencia = ocorrencia;
        ocorrenciaDisciplinar.status_entrega = 0;
        arrayDeOcorrenciaDisciplinar.push(ocorrenciaDisciplinar);
      });
      this.ocorrenciaDisciplinarRespository.save(arrayDeOcorrenciaDisciplinar).then(novaOcorrenciaDisciplinar => {
        resolve(novaOcorrenciaDisciplinar);
      }).catch(reason => {
        reject(reason);
      })
    });
  }

  public inserirAtrasoDaPortaria(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const usr_id = dados['usr_id'];
      const esc_id = dados['esc_id'];
      const atrasos: any[] = dados['atrasos'];
      const tipoOcorrencia = 'Atraso';
      let contaInseridos = 0;
      if (atrasos.length == 0 || atrasos == undefined) {
        resolve();
      }
      this.verificarIdTipoOcorrenciaDisciplinar(tipoOcorrencia).then(tod_id => {
        atrasos.forEach(atraso => {
          const ocorrenciaDisciplinar = new OcorrenciaDisciplinar();
          ocorrenciaDisciplinar.tod_id = tod_id;
          ocorrenciaDisciplinar.usr_id = usr_id;
          ocorrenciaDisciplinar.est_id = atraso['est_id'];
          ocorrenciaDisciplinar.firebase_dbkey = atraso['firebaseDbKey'];
          ocorrenciaDisciplinar.data_hora = new Date(atraso['data'] + ' ' + atraso['hora']);
          ocorrenciaDisciplinar.ocorrencia = 'Atraso inserido automaticamente da portaria';
          ocorrenciaDisciplinar.status_entrega = 0;
          this.verificarExistenciaOcorrenciaPorFirebaseDbKey(ocorrenciaDisciplinar.firebase_dbkey).then(existe => {
            contaInseridos++;
            if (!existe) {
              this.ocorrenciaDisciplinarRespository.save(ocorrenciaDisciplinar).then(() => {
                if (contaInseridos == atrasos.length) {
                  resolve();
                }
              }).catch(reason => {
                reject(reason);
              })
            } else {
              if (contaInseridos == atrasos.length) {
                resolve();
              }
            }
          }).catch(reason => {
            reject(reason)
          })
        })
      })
    })
  }

  public inserirSemUniformeDaPortaria(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const usr_id = dados['usr_id'];
      const esc_id = dados['esc_id'];
      const semUniformes: any[] = dados['semUniforme'];
      const tipoOcorrencia = 'Sem uniforme';
      let contaInseridos = 0;
      if (semUniformes.length == 0 || semUniformes == undefined) {
        resolve();
      }

      this.verificarIdTipoOcorrenciaDisciplinar(tipoOcorrencia).then(tod_id => {
        semUniformes.forEach(semUniforme => {
          const ocorrenciaDisciplinar = new OcorrenciaDisciplinar();
          ocorrenciaDisciplinar.tod_id = tod_id;
          ocorrenciaDisciplinar.usr_id = usr_id;
          ocorrenciaDisciplinar.est_id = semUniforme['est_id'];
          ocorrenciaDisciplinar.firebase_dbkey = semUniforme['firebaseDbKey'];
          ocorrenciaDisciplinar.data_hora = new Date(semUniforme['data'] + ' ' + semUniforme['hora']);
          ocorrenciaDisciplinar.ocorrencia = 'Sem uniforme inserido automaticamente da portaria';
          ocorrenciaDisciplinar.status_entrega = 0;
          this.verificarExistenciaOcorrenciaPorFirebaseDbKey(ocorrenciaDisciplinar.firebase_dbkey).then(existe => {
            contaInseridos++;
            if (!existe) {
              this.ocorrenciaDisciplinarRespository.save(ocorrenciaDisciplinar).then(() => {
                if (contaInseridos == semUniformes.length) {
                  resolve();
                }
              }).catch(reason => {
                reject(reason);
              })
            } else {
              if (contaInseridos == semUniformes.length) {
                resolve();
              }
            }
          }).catch(reason => {
            reject(reason)
          })
        })
      })
    })
  }

  public verificarExistenciaOcorrenciaPorFirebaseDbKey(fbdbkey: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.ocorrenciaDisciplinarRespository.find({ where: { firebase_dbkey: fbdbkey } }).then(ocorrencias => {
        if (ocorrencias.length != 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  }


  public verificarIdTipoOcorrenciaDisciplinar(tipoOcorrencia: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.tipoOcorrenciaDisciplinarRepository.findOne({ where: { tipo_ocorrencia: tipoOcorrencia } }).then(tipoOcorrenciaEncontrada => {
        resolve(tipoOcorrenciaEncontrada.id)
      }).catch(reason => {
        reject(reason);
      })
    })
  }

  public alterarStatusEntregaMensagem(dados: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let statusAlterados = 0;
      if (dados.length == 0) {
        resolve();
      }
      dados.forEach(dado => {
        const fbdbkey = dado['fbdbkey'];
        const status_leitura = dado['status_leitura'];
        this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
          .update({ status_entrega: status_leitura })
          .where('ocd_firebase_dbkey_txt = :fbdbkey', { fbdbkey: fbdbkey })
          .execute()
          .then(updateResult => {
            statusAlterados++;
            if (statusAlterados == dados.length) {
              resolve();
            }
          }).catch(reason => {
            reject(reason);
          });
      });
    })
  }

  public inserirDoAplicativo(dados: any[]): Promise<OcorrenciaDisciplinar[]> {
    return new Promise((resolve, reject) => {
      const ocorrenciasDoAplicativo = new Array<OcorrenciaDisciplinar>();
      dados.forEach(dado => {
        const ocorrenciaDisciplinar = new OcorrenciaDisciplinar();
        ocorrenciaDisciplinar.data_hora = new Date(dado['data'] + ' ' + dado['hora']);
        ocorrenciaDisciplinar.est_id = dado['est_id'];
        ocorrenciaDisciplinar.firebase_dbkey = dado['firebase_dbkey'];
        ocorrenciaDisciplinar.firebase_dbkey_administrativo = dado['firebase_dbkey_admin'];
        ocorrenciaDisciplinar.status_entrega = 0;
        ocorrenciaDisciplinar.tod_id = dado['tod_id'];
        ocorrenciaDisciplinar.usr_id = dado['usr_id'];
        ocorrenciaDisciplinar.ocorrencia = dado['ocorrencia'];
        ocorrenciasDoAplicativo.push(ocorrenciaDisciplinar);
      });
      this.ocorrenciaDisciplinarRespository.save(ocorrenciasDoAplicativo)
        .then(ocorrenciasDisciplinares => {
          resolve(ocorrenciasDisciplinares);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarQuantidadeTipoPeriodo(tod_id: number, dataInicio: Date, dataFim: Date, ordenamento: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'ocd.ocd_id_int as ocorrencias', 'est.est_nome_txt as nome', 'sre.sre_abreviatura_txt as serie',
        'trm.trm_nome_txt as turma', 'trn.trn_abreviatura_txt as turno', 'ete.ete_abreviatura_txt as etapa'
      ];

      if (ordenamento == 'd') {
        this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
          .select(campos)
          .innerJoin('ocd.estudante', 'est')
          .innerJoin('ocd.tipoOcorrenciaDisciplinar', 'tod')
          .innerJoin('est.estudantesTurmas', 'etu')
          .innerJoin('etu.turma', 'trm')
          .innerJoin('trm.turno', 'trn')
          .innerJoin('trm.serie', 'sre')
          .innerJoin('sre.etapaEnsino', 'ete')
          .where('tod.tod_id_int = :tod_id', { tod_id: tod_id })
          .andWhere('date(ocd_data_hora_dtm) >= :dataInicio', { dataInicio: dataInicio })
          .andWhere('date(ocd_data_hora_dtm) <= :dataFim', { dataFim: dataFim })
          .orderBy('ocorrencias', 'DESC')
          .execute()
          .then((ocorrencias: any[]) => {
            let result = [];
            ocorrencias.reduce(function (res, value) {
              if (!res[value.nome]) {
                res[value.nome] = {
                  nome: value.nome, ocorrencias: 0, serie: value.serie,
                  turma: value.turma, turno: value.turno, etapa: value.etapa
                };
                result.push(res[value.nome])
              }
              res[value.nome].ocorrencias += 1;
              return res;
            }, {});
            result = result.sort((a, b) => {
              return a.ocorrencias > b.ocorrencias ? 1 : 0;
            })
            resolve(result);
          }).catch(reason => {
            reject(reason);
          });
      } else {
        this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
          .select(campos)
          .innerJoin('ocd.estudante', 'est')
          .innerJoin('ocd.tipoOcorrenciaDisciplinar', 'tod')
          .innerJoin('est.estudantesTurmas', 'etu')
          .innerJoin('etu.turma', 'trm')
          .innerJoin('trm.turno', 'trn')
          .innerJoin('trm.serie', 'sre')
          .innerJoin('sre.etapaEnsino', 'ete')
          .where('tod.tod_id_int = :tod_id', { tod_id: tod_id })
          .andWhere('date(ocd_data_hora_dtm) >= :dataInicio', { dataInicio: dataInicio })
          .andWhere('date(ocd_data_hora_dtm) <= :dataFim', { dataFim: dataFim })
          .orderBy('sre.sre_abreviatura_txt', 'ASC')
          .orderBy('trm.trm_nome_txt', 'ASC')
          .orderBy('est.est_nome_txt', 'ASC')
          .execute()
          .then((ocorrencias: any[]) => {
            let result = [];
            ocorrencias.reduce(function (res, value) {
              if (!res[value.nome]) {
                res[value.nome] = {
                  nome: value.nome, ocorrencias: 0, serie: value.serie,
                  turma: value.turma, turno: value.turno, etapa: value.etapa
                };
                result.push(res[value.nome])
              }
              res[value.nome].ocorrencias += 1;
              return res;
            }, {});
            resolve(result);
          }).catch(reason => {
            reject(reason);
          });
      }
    });
  }

  public listarDetalhes(est_id: number, dataInicio: Date, dataFim: Date): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'est.est_id_int as est_id', 'est.est_matricula_txt as matricula',
        'ocd.ocd_data_hora_dtm as data_hora', 'tod.tod_tipo_ocorrencia_txt as tipo',
        'ocd.ocd_ocorrencia_txt as ocorrencia'
      ];
      this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
        .select(campos)
        .innerJoin('ocd.tipoOcorrenciaDisciplinar', 'tod')
        .innerJoin('ocd.estudante', 'est')
        .where('est.est_id_int = :est_id', { est_id: est_id })
        .andWhere('date(ocd.ocd_data_hora_dtm) >= :dataInicio', { dataInicio: dataInicio })
        .andWhere('date(ocd.ocd_data_hora_dtm) <= :dataFim', { dataFim: dataFim })
        .execute()
        .then(ocorrencias => {
          resolve(ocorrencias);
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public listarAvaliacaoSocial(trm_id: number, dataInicio: Date, dataFim: Date, total: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos_1 = [
        'est.est_id_int as est_id', 'est.est_matricula_txt as matricula', 'est.est_nome_txt as nome',
        '0 as ocorrencias', `${total} as avaliacao_social`, 'est.est_foto_txt as foto', '0 as valor'
      ];
      let ocorrenciasTurma = new Array<any>();
      this.estudanteRepository.createQueryBuilder('est').select(campos_1)
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .where('trm.trm_id_int = :trm_id', { trm_id: trm_id })
        .execute()
        .then((estudantesTurma: any[]) => {
          ocorrenciasTurma.push(...estudantesTurma);
        }).then(() => {
          const campos_2 = [
            'est.est_id_int as est_id', 'est.est_matricula_txt as matricula', 'est.est_nome_txt as nome',
            '0 as ocorrencias', `${total} as avaliacao_social`, 'est.est_foto_txt as foto', 'tod.tod_valor_num as valor'
          ];
          this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd').select(campos_2)
            .innerJoin('ocd.estudante', 'est')
            .innerJoin('ocd.tipoOcorrenciaDisciplinar', 'tod')
            .innerJoin('est.estudantesTurmas', 'etu')
            .innerJoin('etu.turma', 'trm')
            .where('trm.trm_id_int = :trm_id', { trm_id: trm_id })
            .andWhere('ocd.data_hora >= :dataInicio', { dataInicio: dataInicio })
            .andWhere('ocd.data_hora <= :dataFim', { dataFim: dataFim })
            .execute()
            .then(ocorrencias => {
              ocorrenciasTurma.push(...ocorrencias)
              const novaFormativaCalculada = this.calcularAvaliacaoSocial(ocorrenciasTurma, total);
              resolve(novaFormativaCalculada);
            }).then(reason => {
              reject(reason);
            });
        })
    })
  }

  public calcularAvaliacaoSocial(ocorrenciasTurma: any[], total: number): any[] {
    ocorrenciasTurma = ocorrenciasTurma.sort((a, b) => a.nome > b.nome ? 1 : -1);
    let ocorrenciasCalculadas = new Array<any>();
    ocorrenciasTurma.forEach(ocorrenciaEstudante => {
      const ocorrenciaProcurada = ocorrenciasCalculadas.find(ocorrenciaCalculada => ocorrenciaCalculada.est_id == ocorrenciaEstudante.est_id)
      if (!ocorrenciaProcurada) {
        ocorrenciasCalculadas.push(ocorrenciaEstudante);
      } else {
        ocorrenciaProcurada.valor += ocorrenciaEstudante.valor;
        ocorrenciaProcurada.ocorrencias++;
        const idxNova = ocorrenciasCalculadas.findIndex(ocorrencia => ocorrencia.est_id == ocorrenciaProcurada.est_id);
        ocorrenciasCalculadas[idxNova] = ocorrenciaProcurada;
      }
    })
    ocorrenciasCalculadas = ocorrenciasCalculadas.map(resultadoFinal => {
      resultadoFinal.avaliacao_social = (total - resultadoFinal.valor).toPrecision(3);
      if (resultadoFinal.avaliacao_social < 0) {
        resultadoFinal.avaliacao_social = 0
      }
      return resultadoFinal
    })
    return (ocorrenciasCalculadas);
  }

  public filtrar(valor: string, limit: number, offset: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'est.est_nome_txt as nome', 'sre.sre_nome_txt as serie', 'ete.ete_abreviatura_txt as etapa',
        'trm.trm_nome_txt as turma', 'trn.trn_nome_txt as turno', 'tod.tod_tipo_ocorrencia_txt as tipo',
        'ocd.ocd_ocorrencia_txt as ocorrencia', 'ocd.ocd_data_hora_dtm as data_hora', 'est.est_foto_txt as foto'
      ];
      this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
        .select(campos)
        .innerJoin('ocd.estudante', 'est')
        .innerJoin('est.escola', 'esc')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('sre.etapaEnsino', 'ete')
        .innerJoin('ocd.tipoOcorrenciaDisciplinar', 'tod')
        .where('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('est.est_nome_txt like :valor', { valor: `%${valor}%` })
        .execute()
        .then((ocorrencias: any[]) => {
          const total = ocorrencias.length;
          ocorrencias = ocorrencias.map(ocorrencia => {
            Object.assign(ocorrencia, { total: total });
            return ocorrencia;
          });
          resolve(ocorrencias);
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public listarQuantidadeAlertaNaoVerificada(
    esc_id: number, usr_id: number,
    tod_id: number, data_inicio: Date, data_fim: Date): Promise<OcorrenciaDisciplinar[]> {
    return new Promise((resolve, reject) => {
      const str_data_inicio = data_inicio.toString().split('T')[0]
      const str_data_fim = data_fim.toString().split('T')[0]
      const campos = [
        'ocd.ocd_id_int as ocd_id', 'tod.tod_id_int as tod_id',
        'tod.tod_tipo_ocorrencia_txt as tipo_ocorrencia', 'est.est_id_int as est_id',
        'est.est_nome_txt as nome', 'est.est_matricula_txt as matricula',
        'est.est_foto_txt as foto', 'sre.sre_id_int as sre_id',
        'sre.sre_abreviatura_txt as serie', 'trm.trm_id_int as trm_id',
        'trm.trm_nome_txt as turma', 'trn.trn_id_int as trn_id',
        'trn.trn_abreviatura_txt as turno', 'ete.ete_id_int as ete_id',
        'ete.ete_abreviatura_txt as etapa', '0 as quantidade',
        `'' as data_inicio_considerado`, `'' as data_fim_considerado`
      ];
      const ocd_ids = new Array<number>()
      ocd_ids.push(0);
      this.listarOcorrenciasVerificadas(esc_id, usr_id).then((ocdIds: any[]) => {
        ocdIds.forEach(ocdId => {
          ocd_ids.push(ocdId['ocd_id_int']);
        });
        this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
          .select(campos)
          .innerJoin('ocd.tipoOcorrenciaDisciplinar', 'tod')
          .innerJoin('ocd.estudante', 'est')
          .innerJoin('est.escola', 'esc')
          .innerJoin('est.estudantesTurmas', 'etu')
          .innerJoin('etu.turma', 'trm')
          .innerJoin('trm.serie', 'sre')
          .innerJoin('trm.turno', 'trn')
          .innerJoin('sre.etapaEnsino', 'ete')
          .where('tod.tod_id_int = :tod_id', { tod_id: tod_id })
          .andWhere('ocd.ocd_data_hora_dtm >= :data_inicio', { data_inicio: data_inicio })
          .andWhere('ocd.ocd_data_hora_dtm <= :data_fim', { data_fim: data_fim })
          .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
          .andWhere('ocd.ocd_id_int not in (:...ocd_ids)', { ocd_ids: ocd_ids })
          .orderBy('ocd.ocd_data_hora_dtm', 'DESC')
          .orderBy('est.est_nome_txt', 'ASC')
          .execute()
          .then((alertas: any[]) => {
            let result = [];
            alertas.reduce(function (res, value) {
              value['data_inicio_considerado'] = data_inicio;
              value['data_fim_considerado'] = data_fim;
              if (!res[value.est_id]) {
                res[value.est_id] = value
                result.push(res[value.est_id])
              }
              res[value.est_id].quantidade += 1;
              return res;
            }, {});
            resolve(result);
          }).catch(reason => {
            reject(reason);
          });
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listarQuantidadePeriodo(esc_id: number, data_inicio: Date, data_fim: Date): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        '0 as quantidade',
        'date(ocd_data_hora_dtm) as data'
      ]
      this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
        .select(campos)
        .innerJoin('ocd.estudante', 'est')
        .where('ocd.ocd_data_hora_dtm >= :data_inicio', { data_inicio: data_inicio })
        .andWhere('ocd.ocd_data_hora_dtm <= :data_fim', { data_fim: data_fim })
        .andWhere('est.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('ocd_data_hora_dtm', 'ASC')
        .execute()
        .then((ocorrencias: any[]) => {
          let result = [];
          ocorrencias.reduce(function (res, value) {
            if (!res[value.data]) {
              res[value.data] = value
              result.push(res[value.data])
            }
            res[value.data].quantidade += 1;
            return res;
          }, {});
          resolve(result)
        }).catch(reason => {
          reject(reason)
        });
    })
  }

  public listarQuantidadeTurmaPeriodo(esc_id: number, data_inicio: Date, data_fim: Date): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        '*',
        '0 as quantidade',
      ];
      this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
        .select(campos)
        .innerJoin('ocd.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.escola', 'esc')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('sre.etapaEnsino', 'ete')
        .innerJoin('trm.turno', 'trn')
        .where('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('date(ocd.ocd_data_hora_dtm) >= :data_inicio', { data_inicio: data_inicio })
        .andWhere('date(ocd.ocd_data_hora_dtm) <= :data_fim', { data_fim: data_fim })
        .execute()
        .then((ocorrencias: any[]) => {
          let results = [];
          ocorrencias.reduce(function (res, value) {
            if (!res[value.trm_id_int]) {
              res[value.trm_id_int] = value
              results.push(res[value.trm_id_int])
            }
            res[value.trm_id_int].quantidade += 1;

            return res;
          }, {});
          results = results.map(result => {
            return { quantidade: result.quantidade, turma: result.sre_nome_txt + ' ' + result.ete_abreviatura_txt + ' ' + result.trm_nome_txt + ' - ' + result.trn_nome_txt }
          })
          resolve(results);
        }).catch(reason => {
          reject(reason);
        })
    })
  }

  public listarQuantidadeEstudantePeriodo(trm_id: number, data_inicio: Date, data_fim: Date): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'count(*) as quantidade',
        'est.est_nome_txt as estudante'
      ]
      this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
        .select(campos)
        .innerJoin('ocd.estudante', 'est')
        .innerJoin('est.estudantesTurmas', 'etu')
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .where('trm.trm_id_int = :trm_id', { trm_id: trm_id })
        .andWhere('date(ocd.ocd_data_hora_dtm) >= :data_inicio', { data_inicio: data_inicio })
        .andWhere('date(ocd.ocd_data_hora_dtm) <= :data_fim', { data_fim: data_fim })
        .addGroupBy('est.est_id_int')
        .execute()
        .then((ocorrencias: any[]) => {
          resolve(ocorrencias);
        }).catch(reason => {
          console.log(reason);
        })
    })
  }

  public listarQuantidadeTipoOcorrenciaPeriodo(esc_id: number, data_inicio: Date, data_fim: Date): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'count(*) as quantidade',
        'tod_tipo_ocorrencia_txt as tipo_ocorrencia'
      ]
      this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
        .select(campos)
        .innerJoin('ocd.tipoOcorrenciaDisciplinar', 'tod')
        .where('date(ocd.ocd_data_hora_dtm) >= :data_inicio', { data_inicio: data_inicio })
        .andWhere('date(ocd.ocd_data_hora_dtm) <= :data_fim', { data_fim: data_fim })
        .andWhere('tod.esc_id_int = :esc_id', { esc_id: esc_id })
        .groupBy('tod.tod_id_int')
        .execute()
        .then((ocorrencias: any[]) => {
          resolve(ocorrencias);
        }).catch(reason => {
          reject(reason)
        });
    })
  }

  public listarQuantidadePeriodoLetivoTurma(prl_id: number, trm_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.periodoLetivoRepository.createQueryBuilder('prl')
        .select(['prl_inicio_dte as data_inicio', 'prl_fim_dte as data_fim'])
        .where('prl_id_int = :prl_id', { prl_id: prl_id })
        .execute()
        .then(dados => {
          const dataInicio = dados[0]['data_inicio'];
          const dataFim = dados[0]['data_fim'];
          const campos = [
            'tod.tod_tipo_ocorrencia_txt as tipo_ocorrencia',
            'count(ocd.ocd_id_int) as quantidade',
            'est.est_id_int as est_id'
          ];
          this.ocorrenciaDisciplinarRespository.createQueryBuilder('ocd')
            .select(campos)
            .innerJoin('ocd.estudante', 'est')
            .innerJoin('ocd.tipoOcorrenciaDisciplinar', 'tod')
            .innerJoin('est.estudantesTurmas', 'etu')
            .innerJoin('etu.turma', 'trm')
            .where('trm.trm_id_int = :trm_id', { trm_id: trm_id })
            .andWhere('ocd.ocd_data_hora_dtm >= :dataInicio', { dataInicio: dataInicio })
            .andWhere('ocd.ocd_data_hora_dtm <= :dataFim', { dataFim: dataFim })
            .groupBy('tod.tod_id_int')
            .addGroupBy('est.est_id_int')
            .orderBy('est.est_nome_txt', 'ASC')
            .execute()
            .then((ocorrencias: any[]) => {
              resolve(ocorrencias);
            }).catch(reason => {
              reject(reason);
            })
        }).catch(reason => {
          reject(reason)
        })
    })
  }

  public listarOcorrenciasVerificadas(esc_id: number, usr_id: number): Promise<number[]> {
    return new Promise((resolve, reject) => {
      this.alertaOcorrenciaVerificadaRepository.createQueryBuilder('aov')
        .select('ocd_id_int')
        .where('aov.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('aov.usr_id_int = :usr_id', { usr_id: usr_id })
        .execute()
        .then(ocdIds => {
          resolve(ocdIds)
        }).catch(reason => {
          reject(reason);
        });
    });
  }

}
