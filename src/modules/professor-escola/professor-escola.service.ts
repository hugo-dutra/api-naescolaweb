import { UsuarioProfessorRepository } from './../usuario-professor/usuario-professor.repository';
import { ProfessorEscola } from './professor-escola.entity';
import { ProfessorService } from './../professor/professor.service';
import { ProfessorEscolaRepository } from './professor-escola.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorIntegracaoDto } from '../professor/dto/professor-integracao.dto';
import { Professor } from '../professor/professor.entity';
import { ProfessorRepository } from '../professor/professor.repository';

@Injectable()
export class ProfessorEscolaService {
  constructor(
    @InjectRepository(ProfessorEscolaRepository) private professorEscolaRepository: ProfessorEscolaRepository,
    @InjectRepository(ProfessorRepository) private professorRepository: ProfessorRepository,
    @InjectRepository(UsuarioProfessorRepository) private usuarioProfessorRepository: UsuarioProfessorRepository,
    private professorService: ProfessorService) { }


  public inserirIntegracao(professoresEscolas: any): Promise<void> {
    const esc_id = professoresEscolas.esc_id;
    const professores = <ProfessorIntegracaoDto[]>professoresEscolas.professoresEscolas;
    return new Promise((resolve, reject) => {
      const professoresMapeados = professores.map(professorIntegracaoDto => {
        const professor = new Professor();
        professor.matricula = professorIntegracaoDto.emp_cd_matricula;
        return professor;
      });
      this.pegarIdsPorMatriculas(professoresMapeados).then(arrayDeIds => {
        const arrayEscIdPrfId = this.montarArrayObjectosProfessorEscola(arrayDeIds, esc_id)
        let professoresEscolasInseridos = 0;
        arrayEscIdPrfId.forEach(escIdPrfId => {
          this.verificarProfessorEscola(escIdPrfId).then(existe => {
            if (!existe) {
              const professorEscola = new ProfessorEscola();
              professorEscola.esc_id = escIdPrfId.esc_id;
              professorEscola.prf_id = escIdPrfId.prf_id;
              this.professorEscolaRepository.save(professorEscola).then(() => {
                professoresEscolasInseridos++;
                if (professoresEscolasInseridos == arrayEscIdPrfId.length) {
                  resolve();
                }
              });
            } else {
              professoresEscolasInseridos++;
              if (professoresEscolasInseridos == arrayEscIdPrfId.length) {
                resolve();
              }
            }
          });
        });
      });
    });
  }

  public inserirManual(dadosProfessorEscola: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (dadosProfessorEscola.length == 0) {
        resolve();
      }
      const professoresEscolas = new Array<ProfessorEscola>();
      dadosProfessorEscola.forEach(dados => {
        const professorEscola = new ProfessorEscola();
        professorEscola.esc_id = dados['esc_id'];
        professorEscola.prf_id = dados['prf_id'];
        professoresEscolas.push(professorEscola);
      })
      this.professorEscolaRepository.save(professoresEscolas).then(() => {
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public verificarProfessorEscola(EscIdPrfId: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.professorEscolaRepository.findOne({ where: { esc_id: EscIdPrfId.esc_id, prf_id: EscIdPrfId.prf_id } }).then(professorEscola => {
        if (professorEscola) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((reason: any) => {
        reject(reason);
      })
    })
  }

  public montarArrayObjectosProfessorEscola(arrayDeIds: number[], esc_id): any[] {
    const retorno = arrayDeIds.map(prf_id => {
      return { esc_id: esc_id, prf_id: prf_id }
    });
    return retorno;
  }

  public pegarIdsPorMatriculas(professores: Professor[]): Promise<number[]> {
    return new Promise((resolve, reject) => {
      let contaIdsRecuperados = 0;
      const arrayDeIds = new Array<number>();
      professores.forEach(professor => {
        const matricula = professor.matricula;
        this.professorService.pegarIdPorMatricula(matricula).then(prf_id => {
          contaIdsRecuperados++;
          arrayDeIds.push(prf_id);
          if (contaIdsRecuperados == professores.length) {
            resolve(arrayDeIds);
          }
        }).catch((reason: any) => {
          reject(reason);
        });
      });
    });
  }

  public listarPorEscolaId(esc_id: number, todos: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'prf.prf_id_int as prf_id', 'prf.prf_nome_txt as professor',
        'prf.prf_email_txt as email', 'prf.prf_matricula_txt as matricula',
        'prf.prf_cpf_txt as cpf', 'prf.prf_telefone_txt as telefone'
      ];
      if (todos == 'true') {
        this.professorRepository.createQueryBuilder('prf').select(campos)
          .innerJoin('prf.professoresEscolas', 'pre')
          .where('pre.esc_id_int = :esc_id', { esc_id: esc_id })
          .orderBy('prf.prf_nome_txt', 'ASC')
          .execute()
          .then((professores: any[]) => {
            resolve(professores);
          }).catch(reason => {
            reject(reason)
          })
      } else {
        this.listarPrfIdUsuarioProfessor(esc_id).then((arrayDeIds: number[]) => {
          this.professorRepository.createQueryBuilder('prf').select(campos)
            .innerJoin('prf.professoresEscolas', 'pre')
            .where('pre.esc_id_int = :esc_id', { esc_id: esc_id })
            .andWhere('prf.prf_id_int not in (:...arrayDeIds)', { arrayDeIds: arrayDeIds })
            .orderBy('prf.prf_nome_txt', 'ASC')
            .execute()
            .then((professores: any[]) => {
              resolve(professores);
            }).catch(reason => {
              reject(reason)
            })
        }).catch(reason => {
          reject(reason);
        });
      }
    });
  }

  public listarPrfIdUsuarioProfessor(esc_id: number): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'prf_id_int as prf_id'
      ]
      const ids = new Array<number>()
      this.usuarioProfessorRepository
        .createQueryBuilder('upr')
        .select(campos)
        .execute()
        .then((prfIds: number[]) => {
          ids.push(0);
          prfIds.forEach(prfId => {
            ids.push(prfId['prf_id']);
          })
          resolve(ids);
        }).catch(reason => {
          reject(reason)
        });
    })
  }

}
