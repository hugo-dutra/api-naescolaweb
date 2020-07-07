import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { DiarioProfessor } from './diario-professor.entity';
import { Utils } from 'src/utils/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiarioProfessorRepository } from './diario-professor.repository';
import { ProfessorRepository } from '../professor/professor.repository';
import * as moment from 'moment';


@Injectable()
export class DiarioProfessorService {
  constructor(
    @InjectRepository(ProfessorRepository) private professorRepository: ProfessorRepository,
    @InjectRepository(DiarioProfessorRepository) private diarioProfessorRepository: DiarioProfessorRepository,
    @InjectRepository(UsuarioProfessorRepository) private usuarioProfessorRepository: UsuarioProfessorRepository,
  ) { }

  public inserir(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const prd_id = dados['prd_id'];
      const arrayOfTurmas: number[] = dados['arrayOfTurmas'];
      const nomesDiarios: string[] = dados['nomesDiarios'];
      let contaInteracoes = 0;
      const diariosProfessores = new Array<DiarioProfessor>();
      arrayOfTurmas.forEach((trm_id: number) => {
        this.verificarExistencia(prd_id, trm_id).then(existe => {
          if (!existe) {
            const diarioProfessor = new DiarioProfessor();
            diarioProfessor.prd_id = prd_id;
            diarioProfessor.trm_id = trm_id;
            diarioProfessor.diario = nomesDiarios[contaInteracoes];
            diarioProfessor.criacao = new Date()
            diariosProfessores.push(diarioProfessor);
            contaInteracoes++
            if (contaInteracoes == arrayOfTurmas.length) {
              this.diarioProfessorRepository.save(diariosProfessores).then(novoDiarioProfessor => {
                resolve();
              }).catch(reason => {
                reject(reason);
              })
            }
          } else {
            contaInteracoes++
            if (contaInteracoes == arrayOfTurmas.length) {
              resolve();
            }
          }
        });
      })






















      /* const prd_id = dados['prd_id'];
      const arrayOfTurmas: number[] = dados['arrayOfTurmas'];
      const nomesDiarios: string[] = dados['nomesDiarios'];
      let contaInteracoes = 0;
      arrayOfTurmas.forEach((trm_id: number) => {
        this.verificarExistencia(prd_id, trm_id).then(existe => {
          if (!existe) {
            const diarioProfessor = new DiarioProfessor();
            diarioProfessor.prd_id = prd_id;
            diarioProfessor.trm_id = trm_id;
            diarioProfessor.diario = nomesDiarios[contaInteracoes];
            diarioProfessor.criacao = new Date()
            this.diarioProfessorRepository.save(diarioProfessor).then(novoDiarioProfessor => {
              contaInteracoes++
              if (contaInteracoes == arrayOfTurmas.length) {
                resolve();
              }
            }).catch(reason => {
              reject(reason);
            })
          } else {
            contaInteracoes++
            if (contaInteracoes == arrayOfTurmas.length) {
              resolve();
            }
          }
        });
      }) */




    })
  }

  public verificarExistencia(prd_id: number, trm_id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.diarioProfessorRepository.find({ where: { prd_id: prd_id, trm_id: trm_id } }).then((diarioProfessor: any[]) => {
        if (diarioProfessor.length != 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public listarHabilitados(esc_id: number, limit: number, offset: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.professorRepository.createQueryBuilder('prf')
        .select()
        .innerJoin('prf.professoresDisciplinas', 'prd').innerJoin('prf.professoresEscolas', 'pre')
        .innerJoin('prd.professoresTurmas', 'prt').innerJoin('prd.disciplina', 'dsp')
        .innerJoin('prt.turma', 'trm').innerJoin('pre.escola', 'esc')
        .where('pre.esc_id_int = :esc_id', { esc_id: esc_id })
        .getCount().then((totalProfessores: number) => {
          const campos = [
            'esc.esc_id_int as esc_id', 'prf.prf_id_int as prf_id',
            'prf.prf_nome_txt as professor', 'dsp.dsp_id_int as dsp_id',
            'dsp.dsp_nome_txt as disciplina', 'prd.prd_id_int as prd_id',
            `${totalProfessores} as total`
          ];
          this.professorRepository.createQueryBuilder('prf')
            .select(campos)
            .innerJoin('prf.professoresDisciplinas', 'prd')
            .innerJoin('prf.professoresEscolas', 'pre')
            .innerJoin('prd.professoresTurmas', 'prt')
            .innerJoin('prd.disciplina', 'dsp')
            .innerJoin('prt.turma', 'trm')
            .innerJoin('pre.escola', 'esc')
            .where('prt.esc_id_int = pre.esc_id_int')
            .andWhere('prt.trm_id_int = trm.trm_id_int')
            .andWhere('pre.esc_id_int = :esc_id', { esc_id: esc_id })
            .orderBy('prf.prf_nome_txt', 'ASC')
            .orderBy('dsp.dsp_nome_txt', 'ASC')
            .limit(limit)
            .offset(offset)
            .execute()
            .then((professoresHabilitados: any[]) => {
              const utils = new Utils()
              professoresHabilitados = utils.eliminaValoresRepetidos(professoresHabilitados, 'prd_id')
              resolve(professoresHabilitados)
            }).catch(reason => {
              reject(reason);
            });
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public listarDisciplinaAno(prd_id: number, ano: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'dip_diario_txt as diario',
        'dip_criacao_dte as data'
      ]
      this.diarioProfessorRepository
        .createQueryBuilder('dip')
        .select(campos)
        .where('prd_id_int = :prd_id', { prd_id: prd_id })
        .andWhere(`date_part('year',dip_criacao_dte) = :ano`, { ano: ano })
        .orderBy('dip_diario_txt', 'ASC')
        .execute()
        .then((diarios: any[]) => {
          resolve(diarios)
        }).catch(reason => {
          reject(reason)
        });
    });
  }

  public filtrarHabilitados(esc_id: number, limit: number, offset: number, valor_filtro: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.professorRepository.createQueryBuilder('prf')
        .select()
        .innerJoin('prf.professoresDisciplinas', 'prd').innerJoin('prf.professoresEscolas', 'pre')
        .innerJoin('prd.professoresTurmas', 'prt').innerJoin('prd.disciplina', 'dsp')
        .innerJoin('prt.turma', 'trm').innerJoin('pre.escola', 'esc')
        .where('pre.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('LOWER(prf.prf_nome_txt) like LOWER(:valor_filtro)', { valor_filtro: valor_filtro })
        .getCount().then((totalProfessores: number) => {
          const campos = [
            'esc.esc_id_int as esc_id', 'prf.prf_id_int as prf_id',
            'prf.prf_nome_txt as professor', 'dsp.dsp_id_int as dsp_id',
            'dsp.dsp_nome_txt as disciplina', 'prd.prd_id_int as prd_id',
            `${totalProfessores} as total`
          ];
          this.professorRepository.createQueryBuilder('prf')
            .select(campos)
            .innerJoin('prf.professoresDisciplinas', 'prd')
            .innerJoin('prf.professoresEscolas', 'pre')
            .innerJoin('prd.professoresTurmas', 'prt')
            .innerJoin('prd.disciplina', 'dsp')
            .innerJoin('prt.turma', 'trm')
            .innerJoin('pre.escola', 'esc')
            .where('prt.esc_id_int = pre.esc_id_int')
            .andWhere('prt.trm_id_int = trm.trm_id_int')
            .andWhere('pre.esc_id_int = :esc_id', { esc_id: esc_id })
            .andWhere('LOWER(prf.prf_nome_txt) like LOWER(:valor_filtro)', { valor_filtro: `%${valor_filtro}%` })
            .orderBy('prf.prf_nome_txt', 'ASC')
            .orderBy('dsp.dsp_nome_txt', 'ASC')
            .limit(limit)
            .offset(offset)
            .execute()
            .then((professoresHabilitados: any[]) => {
              const utils = new Utils()
              professoresHabilitados = utils.eliminaValoresRepetidos(professoresHabilitados, 'prd_id')
              resolve(professoresHabilitados)
            }).catch(reason => {
              reject(reason);
            });
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  public listarUsuarioEscola(usr_id: number, esc_id: number, ano: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'dip.dip_id_int as dip_id', 'dip.dip_diario_txt as diario',
        'dip.prd_id_int as prd_id', 'dip.trm_id_int as trm_id',
        'dip.dip_criacao_dte as data_criacao', 'dsp.dsp_nome_txt as disciplina'
      ];

      this.usuarioProfessorRepository
        .createQueryBuilder('upr')
        .select(campos)
        .innerJoin('upr.usuario', 'usr')
        .innerJoin('upr.professor', 'prf')
        .innerJoin('prf.professoresDisciplinas', 'prd')
        .innerJoin('prd.diariosProfessores', 'dip')
        .innerJoin('prd.disciplina', 'dsp')
        .innerJoin('prd.professoresTurmas', 'prt')
        .innerJoin('prt.turma', 'trm')
        .innerJoin('trm.serie', 'sre')
        .where('trm.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('trm.trm_ano_int = :ano', { ano: ano })
        .andWhere('usr.usr_id_int = :usr_id', { usr_id: usr_id })
        .execute()
        .then((diariosProfessor: any[]) => {
          const utils = new Utils();
          diariosProfessor = utils.eliminaValoresRepetidos(diariosProfessor, 'dip_id');
          resolve(diariosProfessor)
        }).catch(reason => {
          reject(reason);
        })
    })
  }
}

