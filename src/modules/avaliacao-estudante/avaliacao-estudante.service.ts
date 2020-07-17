import { PeriodoLetivoRepository } from './../periodo-letivo/periodo-letivo.repository';
import { AvaliacaoEstudanteRepository } from './avaliacao-estudante.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroFrequenciaRepository } from '../registro-frequencia/registro-frequencia.repository';
import { PeriodoLetivo } from '../periodo-letivo/periodo-letivo.entity';

@Injectable()
export class AvaliacaoEstudanteService {
  constructor(
    @InjectRepository(AvaliacaoEstudanteRepository) private avaliacaoEstudanteRepository: AvaliacaoEstudanteRepository,
    @InjectRepository(RegistroFrequenciaRepository) private registroFrequenciaRepository: RegistroFrequenciaRepository,
    @InjectRepository(PeriodoLetivoRepository) private periodoLetivoRepository: PeriodoLetivoRepository,
  ) { }

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

  public consolidarNotasParaBoletimEscolar(media_somatorio: number, prl_id: number, dip_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (media_somatorio == 0) {
        /* MÉDIA PONDERADA */
        resolve(this.consolidarNotasParaBoletimEscolarPorMedia(prl_id, dip_id))
      } else {
        /* SOMA SIMPLES */
        resolve(this.consolidarNotasParaBoletimEscolarPorSomaSimples(prl_id, dip_id))
      }
    });
  }

  public consolidarNotasParaBoletimEscolarPorMedia(prl_id: number, dip_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'ave.ave_id_int as ave_id', 'ave.ave_valor_float as valor', 'dav.dav_peso_num as peso',
        '0 as nota', 'ave.est_id_int as est_id', 'est.est_nome_txt as estudante',
        'est.est_matricula_txt as matricula', 'dsp.dsp_id_int as dsp_id', 'dsp.dsp_nome_txt as disciplina',
        'dsp.dsp_abreviatura_txt as disciplina_abreviada', 'dip.dip_id_int as dip_id', 'dav.dav_peso_num as peso',
        'dav.prl_id_int as prl_id', 'prl.prl_periodo_txt as periodo', 'bes.bes_id_int as bes_id',
        'dip.dip_criacao_dte as data_criacao_diario', '0 as faltas'
      ];
      this.avaliacaoEstudanteRepository.createQueryBuilder('ave')
        .select(campos)
        .innerJoin('ave.diarioAvaliacao', 'dav').innerJoin('dav.diarioProfessor', 'dip')
        .innerJoin('dip.professorDisciplina', 'prd').innerJoin('prd.disciplina', 'dsp')
        .innerJoin('ave.estudante', 'est').innerJoin('dav.periodoLetivo', 'prl')
        .innerJoin('est.boletinsEscolares', 'bes')
        .where('dav.prl_id_int = :prl_id', { prl_id: prl_id })
        .andWhere('dip.dip_id_int = :dip_id', { dip_id: dip_id })
        .execute()
        .then((resultadoConsolidado: any[]) => {
          const result = [];
          resultadoConsolidado.forEach((resultado) => {
            const estudanteListado = result.find((a) => { return a['est_id'] === resultado['est_id'] });
            const quantidadeAvaliacoes = result.filter((a) => { return a['est_id'] === resultado['est_id'] }).length + 1;
            if (!estudanteListado) {
              resultado.nota = (resultado.valor * resultado.peso);
              result.push(resultado)
            } else {
              const idx = result.findIndex((a) => { return a['est_id'] === resultado['est_id'] });
              estudanteListado.nota += (resultado.valor * resultado.peso);
              estudanteListado.nota = estudanteListado.nota / quantidadeAvaliacoes;
              result[idx] = estudanteListado;
            }
          })
          this.contarFaltasRegistroFrequencia(prl_id, dip_id).then((registrosFaltas: any[]) => {
            registrosFaltas.forEach(registro => {
              const registroFalta = registrosFaltas.find((reg) => { return reg['est_id_int'] === registro['est_id_int'] })
              const idxResult = result.findIndex((reg) => { return reg['est_id'] === registro['est_id_int'] });
              result[idxResult].faltas = registroFalta.faltas;
            })
            resolve(result);
          })
        }).catch(reason => {
          reject(reason);
        })
    });
  }

  public consolidarNotasParaBoletimEscolarPorSomaSimples(prl_id: number, dip_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'ave.ave_id_int as ave_id', 'ave.ave_valor_float as valor', 'dav.dav_peso_num as peso',
        '0 as nota', 'ave.est_id_int as est_id', 'est.est_nome_txt as estudante',
        'est.est_matricula_txt as matricula', 'dsp.dsp_id_int as dsp_id', 'dsp.dsp_nome_txt as disciplina',
        'dsp.dsp_abreviatura_txt as disciplina_abreviada', 'dip.dip_id_int as dip_id', 'dav.dav_peso_num as peso',
        'dav.prl_id_int as prl_id', 'prl.prl_periodo_txt as periodo', 'bes.bes_id_int as bes_id',
        'dip.dip_criacao_dte as data_criacao_diario', '0 as faltas'
      ];
      this.avaliacaoEstudanteRepository.createQueryBuilder('ave')
        .select(campos)
        .innerJoin('ave.diarioAvaliacao', 'dav').innerJoin('dav.diarioProfessor', 'dip')
        .innerJoin('dip.professorDisciplina', 'prd').innerJoin('prd.disciplina', 'dsp')
        .innerJoin('ave.estudante', 'est').innerJoin('dav.periodoLetivo', 'prl')
        .innerJoin('est.boletinsEscolares', 'bes')
        .where('dav.prl_id_int = :prl_id', { prl_id: prl_id })
        .andWhere('dip.dip_id_int = :dip_id', { dip_id: dip_id })
        .execute()
        .then((resultadoConsolidado: any[]) => {
          const result = [];
          resultadoConsolidado.forEach((resultado) => {
            const estudanteListado = result.find((a) => { return a['est_id'] === resultado['est_id'] });
            if (!estudanteListado) {
              resultado.nota = resultado.valor;
              result.push(resultado)
            } else {
              const idx = result.findIndex((a) => { return a['est_id'] === resultado['est_id'] });
              estudanteListado.nota += resultado.valor;
              result[idx] = estudanteListado;
            }
          })
          this.contarFaltasRegistroFrequencia(prl_id, dip_id).then((registrosFaltas: any[]) => {
            registrosFaltas.forEach(registro => {
              const registroFalta = registrosFaltas.find((reg) => { return reg['est_id_int'] === registro['est_id_int'] })
              const idxResult = result.findIndex((reg) => { return reg['est_id'] === registro['est_id_int'] });
              result[idxResult].faltas = registroFalta.faltas;
            })
            resolve(result);
          })
        }).catch(reason => {
          reject(reason);
        })
    });

  }

  public contarFaltasRegistroFrequencia(prl_id: number, dip_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.pegarInicioFimPeriodoLetivo(prl_id).then(periodoLetivo => {
        const campos = ['*', '0 as faltas'];
        this.registroFrequenciaRepository.createQueryBuilder('ref')
          .select(campos)
          .innerJoin('ref.estudante', 'est')
          .innerJoin('ref.registroDiario', 'rdi')
          .innerJoin('rdi.diarioProfessor', 'dip')
          .andWhere('date(ref.ref_data_hora_dtm) >= date(:prl_inicio_dte)', { prl_inicio_dte: periodoLetivo.inicio })
          .andWhere('date(ref.ref_data_hora_dtm) <= date(:prl_fim_dte)', { prl_fim_dte: periodoLetivo.fim })
          .andWhere('dip.dip_id_int = :dip_id', { dip_id: dip_id })
          .execute()
          .then((faltas: any[]) => {
            const result = [];
            faltas.forEach((resultado) => {
              const estudanteListado = result.find((a) => { return a['est_id_int'] === resultado['est_id_int'] });
              if (!estudanteListado) {
                if (resultado.ref_presente_int === 0 || resultado.ref_presente_int === 2) {
                  resultado.faltas = 1;
                }
                result.push(resultado)
              } else {
                const idx = result.findIndex((a) => { return a['est_id_int'] === resultado['est_id_int'] });
                if (resultado.ref_presente_int === 0 || resultado.ref_presente_int === 2) {
                  estudanteListado.faltas += 1;
                }
                result[idx] = estudanteListado;
              }
            })
            resolve(result);
          }).catch(reason => {
            reject(reason);
          });
      })
    })
  }

  public pegarInicioFimPeriodoLetivo(prl_id: number): Promise<PeriodoLetivo> {
    return new Promise((resolve, reject) => {
      this.periodoLetivoRepository.findOne(prl_id).then(periodoLetivo => {
        resolve(periodoLetivo)
      }).catch(reason => {
        reject(reason);
      })
    })
  }

}
