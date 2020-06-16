import { Utils } from './../../utils/utils';

import { ProfessorDisciplinaRepository } from './professor-disciplina.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from '../professor/professor.entity';
import { ProfessorDisciplina } from './professor-disciplina.entity';
import { ProfessorDisciplinaIntegracaoDto } from './dto/professor-disciplina-integracao.dto';
import { ProfessorService } from '../professor/professor.service';
import { ProfessorDisciplinaDto } from './dto/professor-disciplina.dto';
import { DeleteResult } from 'typeorm';
import { Disciplina } from '../disciplina/disciplina.entity';
import { ProfessorDisciplinaEscolaDto } from './dto/professor-disciplina-escola.dto';
import { ProfessorTurmaRepository } from '../professor-turma/professor-turma.repository';
import { ProfessorTurma } from '../professor-turma/professor-turma.entity';

@Injectable()
export class ProfessorDisciplinaService {
  private utils = new Utils();
  constructor(
    @InjectRepository(ProfessorDisciplinaRepository) private professorDisciplinaRepository: ProfessorDisciplinaRepository,
    @InjectRepository(ProfessorTurmaRepository) private professorTurmaRepository: ProfessorTurmaRepository,
    private professorService: ProfessorService) { }


  /**
   * Insere nova relação entre professor disciplina
   * @param professores
   * @param disciplinas
   */
  public inserir(professores: number[], disciplinas: number[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const professoresDisciplinasDto = this.montarArrayProfessorDisciplina(professores, disciplinas);
      let professoresDisciplinas = 0;
      professoresDisciplinasDto.forEach(professorDisciplina => {
        this.verificarExistencia(professorDisciplina).then(existe => {
          professoresDisciplinas++;
          if (!existe) {
            this.professorDisciplinaRepository.save(professorDisciplina).then((professorDisciplinaInserido: ProfessorDisciplina) => {
              if (professoresDisciplinas == professoresDisciplinasDto.length) {
                resolve();
              }
            }).catch((reason: any) => {
              reject(reason);
            });
          } else {
            if (professoresDisciplinas == professoresDisciplinasDto.length) {
              resolve();
            }
          }
        }).catch((reason: any) => {
          reject(reason);
        });
      });
    });
  }

  /**
   * Insere dados da integração com o SEDF
   * @param professoresDisciplinasIntegracaoDto
   */
  public inserirIntegracao(professoresDisciplinasIntegracaoDto: ProfessorDisciplinaIntegracaoDto[]): Promise<ProfessorDisciplina> {
    return new Promise((resolve, reject) => {
      this.montarArrayProfessorDisciplinaIntegracao(professoresDisciplinasIntegracaoDto).then(professoresDisciplinasDto => {
        let professoresDisciplinas = 0;
        const valoresFiltrados = this.reunirFiltrarDividir(professoresDisciplinasDto);
        valoresFiltrados.forEach(professorDisciplinaFiltrado => {
          this.verificarExistencia(professorDisciplinaFiltrado).then(existe => {
            professoresDisciplinas++;
            if (!existe) {
              this.professorDisciplinaRepository.save(professorDisciplinaFiltrado).then((professorDisciplinaInserido: ProfessorDisciplinaDto) => {
                if (professoresDisciplinas == valoresFiltrados.length) {
                  resolve();
                }
              }).catch((reason: any) => {
                reject(reason);
              });
            } else {
              if (professoresDisciplinas == valoresFiltrados.length) {
                resolve();
              }
            }
          }).catch((reason: any) => {
            reject(reason);
          });
        });
      });
    });
  }

  /**
   * Remove itens repetidos da listagem
   * @param professoresDisciplinasDto
   */
  public reunirFiltrarDividir(professoresDisciplinasDto: ProfessorDisciplinaDto[]): ProfessorDisciplinaDto[] {
    const matrizReunida = professoresDisciplinasDto.map(professorDisciplinaDto => {
      return { prf_id_dsp_id: professorDisciplinaDto.prf_id + "-" + professorDisciplinaDto.dsp_id };
    })
    const matrizFiltrada = this.utils.eliminaValoresRepetidos(matrizReunida, 'prf_id_dsp_id');
    const matrizDividida = matrizFiltrada.map(valorFiltrado => {
      const professorDisciplinaDto = new ProfessorDisciplinaDto();
      professorDisciplinaDto.prf_id = parseInt(valorFiltrado['prf_id_dsp_id'].toString().split('-')[0]);
      professorDisciplinaDto.dsp_id = parseInt(valorFiltrado['prf_id_dsp_id'].toString().split('-')[1]);
      return professorDisciplinaDto;
    });
    return matrizDividida;
  }

  /**
   * Prepara os dados que estão no formado da SEDF para o padrão dos objetos do sistema
   * @param professoresDisciplinasIntegracaoDto
   */
  public montarArrayProfessorDisciplinaIntegracao(professoresDisciplinasIntegracaoDto: ProfessorDisciplinaIntegracaoDto[]): Promise<ProfessorDisciplinaDto[]> {
    return new Promise((resolve, reject) => {
      const arrayProfessorDisciplinaDto = new Array<ProfessorDisciplinaDto>();
      let contaArrayMontado = 0;
      professoresDisciplinasIntegracaoDto.forEach(professorDisciplinaIntegracaoDto => {
        this.professorService.pegarIdPorMatricula(professorDisciplinaIntegracaoDto.emp_cd_matricula).then(prf_id => {
          contaArrayMontado++;
          const professorDisciplina = new ProfessorDisciplina();
          professorDisciplina.prf_id = prf_id;
          professorDisciplina.dsp_id = professorDisciplinaIntegracaoDto.cod_disciplina;
          arrayProfessorDisciplinaDto.push(professorDisciplina);
          if (contaArrayMontado == professoresDisciplinasIntegracaoDto.length) {
            resolve(arrayProfessorDisciplinaDto)
          }
        }).catch((reason: any) => {
          reject(reason);
        })
      });
    });
  }

  public desvincular(parametros: any): Promise<DeleteResult> {
    const dsp_id = parametros['dsp_id'];
    const prf_id = parametros['prf_id'];
    return new Promise((resolve, reject) => {
      this.professorDisciplinaRepository
        .createQueryBuilder().delete()
        .andWhere('prf_id_int = :prf_id', { prf_id: prf_id })
        .andWhere('dsp_id_int = :dsp_id', { dsp_id: dsp_id })
        .execute()
        .then((deleteResult: DeleteResult) => {
          resolve(deleteResult);
        }).catch((reason: any) => {
          reject(reason);
        });
    })
  }

  /**
   * Lista professores e disciplinas para professores em determinada escola
   * @param esc_id
   * @param todos
   */
  public listarDisciplinas(esc_id: number, todos: boolean): Promise<ProfessorDisciplinaEscolaDto[]> {
    return new Promise((resolve, reject) => {
      if (todos) {
        this.listarTodasDisciplinas(esc_id).then((disciplinas: ProfessorDisciplinaEscolaDto[]) => {
          resolve(disciplinas);
        }).catch((reason: any) => {
          reject(reason);
        })
      } else {
        this.listarDisciplinasPorEscola(esc_id).then((disciplinas: ProfessorDisciplinaEscolaDto[]) => {
          resolve(disciplinas);
        }).catch((reason: any) => {
          reject(reason);
        })
      }
    })
  }

  public listarTodasDisciplinas(esc_id: number): Promise<ProfessorDisciplinaEscolaDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'prd.prd_id_int as prd_id',
        'prf.prf_nome_txt as professor',
        'dsp.dsp_nome_txt as disciplina',
        'dsp.dsp_abreviatura_txt as disciplina_abreviada',
        'esc.esc_id_int as esc_id',
        'esc.esc_nome_txt as escola',
        'ete.ete_abreviatura_txt as etapa_abrv'
      ];
      this.professorDisciplinaRepository.createQueryBuilder('prd')
        .select(campos)
        .innerJoin('prd.professor', 'prf')
        .innerJoin('prd.disciplina', 'dsp')
        .innerJoin('prf.professoresEscolas', 'pre')
        .innerJoin('pre.escola', 'esc')
        .innerJoin('dsp.etapaEnsino', 'ete')
        .where('pre.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('prf.prf_nome_txt', 'ASC')
        .execute()
        .then((professorDisciplinaEscolaDto: ProfessorDisciplinaEscolaDto[]) => {
          resolve(professorDisciplinaEscolaDto)
        }).catch((reason: any) => {
          reject(reason);
        });
    });
  }

  public async listarDisciplinasPorEscola(esc_id: number): Promise<ProfessorDisciplinaEscolaDto[]> {
    const arrayDeIds = await this.pegarIdsProfessorDisciplina();
    return new Promise((resolve, reject) => {
      const campos = [
        'prd.prd_id_int as prd_id',
        'prf.prf_nome_txt as professor',
        'dsp.dsp_nome_txt as disciplina',
        'dsp.dsp_abreviatura_txt as disciplina_abreviada',
        'esc.esc_id_int as esc_id',
        'esc.esc_nome_txt as escola',
        'ete.ete_abreviatura_txt as etapa_abrv'
      ];
      this.professorDisciplinaRepository.createQueryBuilder('prd')
        .select(campos)
        .innerJoin('prd.professor', 'prf')
        .innerJoin('prd.disciplina', 'dsp')
        .innerJoin('prf.professoresEscolas', 'pre')
        .innerJoin('pre.escola', 'esc')
        .innerJoin('dsp.etapaEnsino', 'ete')
        .andWhere('prd.prd_id_int not in (:...arrayDeIds)', { arrayDeIds: arrayDeIds })
        .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('prf.prf_nome_txt', 'ASC')
        .execute()
        .then((professorDisciplinaEscolaDto: ProfessorDisciplinaEscolaDto[]) => {
          resolve(professorDisciplinaEscolaDto)
        }).catch((reason: any) => {
          reject(reason);
        });
    })
  }

  public pegarIdsProfessorDisciplina(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      let arrayPrdId = new Array<number>();
      arrayPrdId = [0];
      this.professorTurmaRepository.find().then((professoresTurma: ProfessorTurma[]) => {
        professoresTurma.forEach(professorTurma => {
          arrayPrdId.push(professorTurma.prd_id);
        });
        resolve(arrayPrdId);
      }).catch((reason: any) => {
        reject(reason);
      })
    })
  }

  /**
   * Ajuste dos dados para serem inseridos.
   * @param professores
   * @param disciplinas
   */
  public montarArrayProfessorDisciplina(professores: number[], disciplinas: number[]): ProfessorDisciplinaDto[] {
    const professoresDisciplinasDto = new Array<ProfessorDisciplinaDto>();
    professores.forEach(prf_id => {
      disciplinas.forEach(dsp_id => {
        const professorDisciplinaDto = new ProfessorDisciplinaDto();
        professorDisciplinaDto.prf_id = prf_id;
        professorDisciplinaDto.dsp_id = dsp_id;
        professoresDisciplinasDto.push(professorDisciplinaDto);
      });
    });
    return professoresDisciplinasDto;
  }

  public pegarPrdIdPorDisciplinaProfessor(dsp_id: number, prf_id: number): Promise<ProfessorDisciplina> {
    return new Promise((resolve, reject) => {
      this.professorDisciplinaRepository.find({ where: { dsp_id: dsp_id, prf_id: prf_id } }).then((professoresDisciplinas: ProfessorDisciplina[]) => {
        resolve(professoresDisciplinas[0]);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  /**
   * Verifica se registro já existe no banco
   * @param professorDisciplinaDto
   */
  public verificarExistencia(professorDisciplinaDto: ProfessorDisciplinaDto): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.professorDisciplinaRepository
        .find({ where: { prf_id: professorDisciplinaDto.prf_id, dsp_id: professorDisciplinaDto.dsp_id } })
        .then((professorDisciplina: ProfessorDisciplina[]) => {
          if (professorDisciplina.length != 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((reason: any) => {
          reject(reason);
        });
    });
  }

}
