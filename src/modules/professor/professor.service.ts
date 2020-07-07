import { DiarioProfessorRepository } from './../diario-professor/diario-professor.repository';
import { EscopoPerfilUsuarioService } from './../escopo-perfil-usuario/escopo-perfil-usuario.service';
import { ProfessorRepository } from './professor.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from './professor.entity';
import { EscopoPerfilUsuarioRepository } from '../escopo-perfil-usuario/escopo-perfil-usuario.repository';
import { escopo } from './escopo-usuario.enum';
import { Utils } from 'src/utils/utils';
import { EscolaRepository } from '../escola/escola.repository';
import { Escola } from '../escola/escola.entity';
import { DeleteResult } from 'typeorm';
import { ProfessorIntegracaoDto } from './dto/professor-integracao.dto';
import { UsuarioProfessorRepository } from '../usuario-professor/usuario-professor.repository';

@Injectable()
export class ProfessorService {
  private utils = new Utils();

  constructor(
    @InjectRepository(ProfessorRepository) private professorRepository: ProfessorRepository,
    @InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository,
    private escopoPerfilUsuarioService: EscopoPerfilUsuarioService,
  ) { }

  public inserir(professor: Professor): Promise<Professor> {
    return new Promise((resolve, reject) => {
      this.verificarExistencia(professor).then(existe => {
        if (!existe) {
          this.professorRepository.save(professor).then((professor: Professor) => {
            resolve(professor);
          })
        } else {
          resolve(null);
        }
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }

  public inserirIntegracao(professoresIntegracao: ProfessorIntegracaoDto[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const professoresMapeados = professoresIntegracao.map(professorIntegracao => {
        const professor = new Professor();
        professor.nome = professorIntegracao.nm_professor;
        professor.matricula = professorIntegracao.emp_cd_matricula;
        return professor;
      })
      let contaInseridos = 0;
      professoresMapeados.forEach(professor => {
        this.verificarExistencia(professor).then(existe => {
          contaInseridos++;
          if (!existe) {
            this.professorRepository.save(professor).then((professor: Professor) => {
              if (professoresMapeados.length == contaInseridos) {
                resolve();
              }
            }).catch((reason: any) => {
              reject(reason);
            });
          } else {
            if (professoresMapeados.length == contaInseridos) {
              resolve();
            }
          }
        }).catch((reason: any) => {
          reject(reason);
        });
      });
    });
  }

  public listarDisciplinas(prf_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'dsp.dsp_id_int as dsp_id',
        'dsp.dsp_nome_txt as disciplina',
        'dsp.dsp_abreviatura_txt as disciplina_abv',
        'prf.prf_id_int as prf_id',
        'prf.prf_nome_txt as professor'
      ];
      if (prf_id > 0) {
        this.professorRepository.createQueryBuilder('prf').select(campos)
          .innerJoin('prf.professoresDisciplinas', 'prd')
          .innerJoin('prd.disciplina', 'dsp')
          .where('prd.prf_id_int = :prf_id', { prf_id: prf_id })
          .execute()
          .then((professorDisciplinas: any[]) => {
            resolve(professorDisciplinas);
          }).catch((reason: any) => {
            reject(reason);
          });
      } else {
        this.professorRepository.createQueryBuilder('prf').select(campos)
          .innerJoin('prf.professoresDisciplinas', 'prd')
          .innerJoin('prd.disciplina', 'dsp')
          .execute()
          .then((professorDisciplinas: any[]) => {
            resolve(professorDisciplinas);
          }).catch((reason: any) => {
            reject(reason);
          });
      }
    });
  }

  public listarSemDisciplina(limit: number, offset: number, asc: number, usr_id: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.escopoPerfilUsuarioService.listarNivelAcessoUsuario(usr_id, esc_id).then((escopoUsuario: string) => {
        const nomeEscopo = escopoUsuario['nome'];
        if (nomeEscopo == escopo.GLOBAL) {
          resolve(this.listarSemDisciplinaGlobal(limit, offset, asc, usr_id));
        }
        if (nomeEscopo == escopo.REGIONAL) {
          resolve(this.listarSemDisciplinaRegional(limit, offset, asc, usr_id, esc_id));
        }
        if (nomeEscopo == escopo.LOCAL) {
          resolve(this.listarSemDisciplinaLocal(limit, offset, asc, usr_id, esc_id))
        }
      });
    })
  }



  public listarSemDisciplinaLocal(limit: number, offset: number, asc: number, usr_id: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      console.log('Local:', limit, offset, asc, usr_id, esc_id);
      resolve([]);
    })
  }

  public listarSemDisciplinaRegional(limit: number, offset: number, asc: number, usr_id: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      console.log('Regional:', limit, offset, asc, usr_id, esc_id);
      resolve([]);
    })
  }

  public listarSemDisciplinaGlobal(limit: number, offset: number, asc: number, usr_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      console.log('Global:', limit, offset, asc, usr_id);
      resolve([]);
    })
  }

  public listarTurmaDisciplina(esc_id: number, usr_id: number, ano: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'dsp.dsp_id_int as dsp_id', 'dsp.dsp_abreviatura_txt as disciplina_abreviada',
        'sre.sre_id_int as sre_id', 'sre.sre_abreviatura_txt as serie_abreviada',
        'trm.trm_id_int as trm_id', 'trm.trm_nome_txt as turma',
        'trn.trn_abreviatura_txt as turno_abreviado', 'ete.ete_abreviatura_txt as etapa_ensino_abreviada'
      ];
      this.professorRepository.createQueryBuilder('prf')
        .select(campos)
        .innerJoin('prf.professoresDisciplinas', 'prd')
        .innerJoin('prd.disciplina', 'dsp')
        .innerJoin('prf.professoresEscolas', 'pre')
        .innerJoin('prd.diariosProfessores', 'dip')
        .innerJoin('dip.turma', 'trm')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('sre.etapaEnsino', 'ete')
        .innerJoin('pre.escola', 'esc')
        .innerJoin('esc.usuariosEscolas', 'use')
        .where('use.usr_id_int = :usr_id', { usr_id: usr_id })
        .andWhere('use.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('extract(year from dip_criacao_dte) = :ano', { ano: ano })
        .execute()
        .then(diariosProfessor => {
          resolve(diariosProfessor);
        }).catch(reason => {
          reject(reason);
        });
    })
  }


  public listar(limit: number, offset: number, asc: boolean, usr_id: number, esc_id: number): Promise<Professor[]> {
    return new Promise((resolve, reject) => {
      this.escopoPerfilUsuarioService.listarNivelAcessoUsuario(usr_id, esc_id).then((escopoUsuario: string) => {
        const nomeEscopo = escopoUsuario['nome'];
        if (nomeEscopo == escopo.LOCAL) {
          this.listarEscopoLocal(limit, offset, esc_id, asc).then((professores: Professor[]) => {
            resolve(professores);
          }).catch((reason: any) => {
            reject(reason);
          });
        }

        if (nomeEscopo == escopo.REGIONAL) {
          this.listarEscopoRegional(limit, offset, esc_id, usr_id, asc).then((professores: Professor[]) => {
            resolve(professores);
          }).catch((reason: any) => {
            reject(reason);
          });
        }

        if (nomeEscopo == escopo.GLOBAL) {
          this.listarEscopoGlobal(limit, offset, asc).then((professores: Professor[]) => {
            resolve(professores);
          }).catch((reason: any) => {
            reject(reason);
          });
        }

      });
    });
  }

  public totalProfessoresLocal(esc_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.professorRepository.createQueryBuilder('prf')
        .innerJoin('prf.professoresEscolas', 'pre')
        .innerJoin('pre.escola', 'esc')
        .innerJoin('esc.regiaoEscola', 'ree')
        .where('pre.esc_id_int = :esc_id', { esc_id: esc_id })
        .getCount()
        .then((total: number) => {
          resolve(total);
        }).catch((reason: any) => {
          reject(reason);
        });
    });
  }

  public totalProfessoresRegional(esc_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.pegarIdRegiaoEscolaPorEscolaId(esc_id).then((ree_id: number) => {
        this.professorRepository.createQueryBuilder('prf')
          .innerJoin('prf.professoresEscolas', 'pre')
          .innerJoin('pre.escola', 'esc')
          .innerJoin('esc.regiaoEscola', 'ree')
          .where('ree.ree_id_int = :ree_id', { ree_id: ree_id })
          .getCount()
          .then((total: number) => {
            resolve(total);
          }).catch((reason: any) => {
            reject(reason);
          });
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public totalProfessoresGlobal(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.professorRepository.createQueryBuilder('prf')
        .getCount()
        .then((total: number) => {
          resolve(total);
        }).catch((reason: any) => {
          reject(reason);
        });
    });
  }


  public listarEscopoLocal(limit: number, offset: number, esc_id: number, asc: boolean): Promise<Professor[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'prf.prf_id_int as id', 'prf.prf_nome_txt as nome', 'prf.prf_email_txt as email',
        'prf.prf_matricula_txt as matricula', 'prf.prf_cpf_txt as cpf', 'prf.prf_telefone_txt as telefone'
      ];
      this.totalProfessoresLocal(esc_id).then(totalProfessores => {
        this.professorRepository.createQueryBuilder('prf')
          .select(campos)
          .innerJoin('prf.professoresEscolas', 'pre')
          .innerJoin('pre.escola', 'esc')
          .innerJoin('esc.regiaoEscola', 'ree')
          .where('pre.esc_id_int = :esc_id', { esc_id: esc_id })
          .orderBy('prf.prf_nome_txt', asc == true ? 'ASC' : 'DESC')
          .limit(limit)
          .offset(offset).execute().then((professores: Professor[]) => {
            let professoresSemRepetidos = <Professor[]>this.utils.eliminaValoresRepetidos(professores, 'id');
            professoresSemRepetidos = professoresSemRepetidos.map(professor => {
              Object.assign(professor, { total: totalProfessores });
              return professor;
            });
            resolve(professoresSemRepetidos);
          }).catch((reason: any) => {
            reject(reason);
          });
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listarEscopoRegional(limit: number, offset: number, esc_id: number, usr_id: number, asc: boolean): Promise<Professor[]> {
    return new Promise((resolve, reject) => {
      this.totalProfessoresRegional(esc_id).then(totalProfessores => {
        this.pegarIdRegiaoEscolaPorEscolaId(esc_id).then((ree_id: number) => {
          const campos = [
            'prf.prf_id_int as id', 'prf.prf_nome_txt as nome', 'prf.prf_email_txt as email',
            'prf.prf_matricula_txt as matricula', 'prf.prf_cpf_txt as cpf', 'prf.prf_telefone_txt as telefone',
          ];
          this.professorRepository.createQueryBuilder('prf').select(campos)
            .innerJoin('prf.professoresEscolas', 'pre')
            .innerJoin('pre.escola', 'esc')
            .innerJoin('esc.regiaoEscola', 'ree')
            .where('ree.ree_id_int = :ree_id', { ree_id: ree_id })
            .orderBy('prf.prf_nome_txt', asc == true ? 'ASC' : 'DESC')
            .limit(limit)
            .offset(offset)
            .execute()
            .then((professores: Professor[]) => {
              let professoresSemRepetidos = <Professor[]>this.utils.eliminaValoresRepetidos(professores, 'id');
              professoresSemRepetidos = professoresSemRepetidos.map(professor => {
                Object.assign(professor, { total: totalProfessores });
                return professor;
              });
              resolve(professoresSemRepetidos);
            }).catch((reason: any) => {
              reject(reason);
            });
        }).catch((reason: any) => {
          reject(reason);
        });
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public listarEscopoGlobal(limit: number, offset: number, asc: boolean): Promise<Professor[]> {
    return new Promise((resolve, reject) => {
      this.totalProfessoresGlobal().then(totalProfessores => {
        const campos = [
          'prf.prf_id_int as id', 'prf.prf_nome_txt as nome', 'prf.prf_email_txt as email',
          'prf.prf_matricula_txt as matricula', 'prf.prf_cpf_txt as cpf', 'prf.prf_telefone_txt as telefone'
        ];
        this.professorRepository.createQueryBuilder('prf').select(campos)
          .orderBy('prf.prf_nome_txt', asc == true ? 'ASC' : 'DESC')
          .limit(limit)
          .offset(offset)
          .execute()
          .then((professores: Professor[]) => {
            let professoresSemRepetidos = <Professor[]>this.utils.eliminaValoresRepetidos(professores, 'id');
            professoresSemRepetidos = professoresSemRepetidos.map(professor => {
              Object.assign(professor, { total: totalProfessores });
              return professor;
            });
            resolve(professoresSemRepetidos);
          }).catch((reason: any) => {
            reject(reason);
          });
      }).catch(reason => {
        reject(reason);
      })
    });
  }

  public alterar(professor: Professor): Promise<Professor> {
    return new Promise((resolve, reject) => {
      this.professorRepository.save(professor).then((professor: Professor) => {
        resolve(professor);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public excluir(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.professorRepository.delete(id).then((deleteResult: DeleteResult) => {
        resolve(deleteResult);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public verificarExistencia(professor: Professor): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.professorRepository.find({ where: { matricula: professor.matricula } })
        .then((professores: Professor[]) => {
          if (professores.length != 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((reason: any) => {
          reject(reason);
        })
    });
  }

  /**
   * Retorno o Id da região da escola (ree_id) da escola informada
   * @param esc_id
   */
  public pegarIdRegiaoEscolaPorEscolaId(esc_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.findOne(esc_id).then((escola: Escola) => {
        resolve(escola.ree_id);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  /**
   * Pegar Id por matricula
   * @param esc_id
   */
  public pegarIdPorMatricula(matricula: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.professorRepository.findOne({ where: { matricula: matricula } }).then((professor: Professor) => {
        resolve(professor.id);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }


}
