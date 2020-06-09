
import { OcorrenciaDisciplinar } from './ocorrencia-disciplinar.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OcorrenciaDisciplinarRespository } from './ocorrencia-disciplinar.repository';

@Injectable()
export class OcorrenciaDisciplinarService {
  constructor(@InjectRepository(OcorrenciaDisciplinarRespository) private ocorrenciaDisciplinarRespository: OcorrenciaDisciplinarRespository) { }

  public inserir(dados: any): Promise<OcorrenciaDisciplinar[]> {
    return new Promise((resolve, reject) => {
      const arrayDetalhes = Array.from(dados['array_msg']);
      const tod_id = dados['tod_id'];
      const usr_id = dados['usr_id'];
      const data_hora = dados['data_hora'];
      const ocorrencia = dados['ocorrencia'];
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
        'est.est_id_int as est_id', 'est.est_matricula_txt as matricula', 'ocd.ocd_data_hora_dtm as data_hora',
        'tod.tod_tipo_ocorrencia_txt as tipo', 'ocd.ocd_ocorrencia_txt as ocorrencia'
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

  public calcularAvaliacaoSocial(trm_id: number, dataInicio: Date, dataFim: Date, total: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'est.est_id_int as est_id', 'est.est_matricula_txt as matricula', 'est.est_nome_txt as nome',
        'ocd.ocd_id_int as ocorrencias', '0 as avaliacao_social', 'est.est_foto_txt as foto'
      ];
      resolve(null);
      //console.log(trm_id, dataInicio, dataFim, total);
      //resolve(null);
    })
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
        })
    })
  }

}
