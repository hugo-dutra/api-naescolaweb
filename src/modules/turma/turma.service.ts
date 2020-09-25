import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TurmaRepository } from './turma.repository';
import { Turma } from './turma.entity';
import { TurmaPorEscolaDto } from './dto/turma-escola.dto';
import { DeleteResult } from 'typeorm';
import { Utils } from '../../utils/utils';
import { TurnoService } from '../turno/turno.service';
import { TurmaIntegracaoNomeDto } from './dto/turma-integracao-nomes.dto';
import { EstudanteTurmaRepository } from '../estudante-turma/estudante-turma.repository';


@Injectable()
export class TurmaService {
  private utils = new Utils();
  constructor(
    @InjectRepository(TurmaRepository) private turmaRepository: TurmaRepository,
    private turnoService: TurnoService) { }

  /**
   * Insere novas turmas
   * @param turma
   */
  public inserirTurma(turmas: Turma[]): Promise<Turma[]> {
    const novasTurmas = new Array<Turma>();
    return new Promise((resolve, reject) => {
      let contaTurma = 0;
      turmas.forEach((turma: Turma) => {
        contaTurma++;
        this.verificarExistenciaTurma(turma).then((existe: boolean) => {
          if (!existe) {
            this.turmaRepository.save(turma).then((novaTurma: Turma) => {
              novasTurmas.push(novaTurma);
              if (contaTurma == turmas.length) {
                resolve(novasTurmas);
              }
            }).catch((reason: any) => {
              reject(reason);
            });
          } else {
            if (contaTurma == turmas.length) {
              resolve(null);
            }
          }
        }).catch((reason: any) => {
          reject(reason);
        });
      });
    });
  }

  /**
   * Insere novas turmas a partir da integração com o IEducar
   * @param turmas
   */
  public inserirTurmaIntegracao(turmas: TurmaIntegracaoNomeDto[]): Promise<TurmaIntegracaoNomeDto[]> {
    return new Promise((resolve, reject) => {
      let contaTurmasInseridas = 0;
      let arrayTurmasInseridas = new Array<TurmaIntegracaoNomeDto>();
      turmas.forEach((turma: TurmaIntegracaoNomeDto) => {
        this.verificarExistenciaIntegracao(turma).then((existe: boolean) => {
          contaTurmasInseridas++
          if (!existe) {
            this.turnoService.listarIdTurnoPorEscolaNomeTurno(turma.esc_id, turma.trn_nome).then((turnoId: number) => {
              turma.trn_id = turnoId;
              const queryString = 'insert into turma_trm (trm_id_int, trm_nome_txt, sre_id_int, trn_id_int, trm_ano_int, esc_id_int) values ($1, $2, $3, $4, $5, $6)';
              this.turmaRepository.query(queryString,
                [turma.id, turma.nome, turma.sre_id, turma.trn_id, turma.ano, turma.esc_id])
                .then(() => {
                  arrayTurmasInseridas.push(turma);
                  if (contaTurmasInseridas == turmas.length) {
                    resolve(arrayTurmasInseridas);
                  }
                });
            })
          } else {
            resolve(null)
          }
        }).catch((reason: any) => {
          reject(reason);
        });
      });
    });
  }

  public listarTodasAno(ano: number, esc_id: number): Promise<Turma[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'trm.trm_id_int as id',
        'trm.trm_nome_txt as nome',
        'trm.sre_id_int as sre_id',
        'sre.sre_nome_txt as serie',
        'trm.trn_id_int as trn_id',
        'trn.trn_nome_txt as turno',
        'trm.trm_ano_int as ano',
        'trm.esc_id_int as esc_id',
        'esc.esc_nome_txt as escola',
        'ete.ete_abreviatura_txt as etapa',
        'count(est.est_id_int) as matriculados',
        'sre.sre_abreviatura_txt as serie_abv',
        'trn.trn_abreviatura_txt as turno_abv'
      ];

      this.turmaRepository
        .createQueryBuilder('trm')
        .leftJoin('trm.serie', 'sre')
        .leftJoin('trm.escola', 'esc')
        .leftJoin('esc.redeEnsino', 'ren')
        .leftJoin('sre.etapaEnsino', 'ete')
        .leftJoin('trm.turno', 'trn')
        .leftJoin('trm.estudantesTurmas', 'etu')
        .leftJoin('etu.estudante', 'est')
        .select(campos)
        .andWhere('trm.trm_ano_int = :ano', { ano: ano })
        .andWhere('esc.esc_id_int = :esc_id', { esc_id: esc_id })
        .addGroupBy('trm.trm_id_int')
        .addGroupBy('sre.sre_id_int')
        .addGroupBy('esc.esc_id_int')
        .addGroupBy('ren.ren_id_int')
        .addGroupBy('ete.ete_id_int')
        .addGroupBy('trn.trn_id_int')
        .addGroupBy('etu.etu_id_int')
        .addGroupBy('est.est_id_int')
        .getRawMany().then((turmas: any[]) => {
          let turmasFiltrado = this.utils.eliminaValoresRepetidos(turmas, 'id');
          this.contarQuantidadeEstudantesMatriculados(esc_id).then(matriculadosPorTurma => {
            turmasFiltrado = <Turma[]>turmasFiltrado.map(turma => {
              const { matriculados } = matriculadosPorTurma.find(mat => mat['trm_id'] === turma['id'])
              turma['matriculados'] = matriculados;
              return turma;
            }).sort((a, b) => a['serie'] > b['serie'] ? 1 : -1)
              .sort((a, b) => a['nome'] > b['nome'] ? 1 : -1)
            console.log(turmasFiltrado);
            resolve(<Turma[]>turmasFiltrado);
          }).catch(reason => {
            reject(reason);
          })
        })
    });
  }


  public contarQuantidadeEstudantesMatriculados(esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'trm.trm_id_int as trm_id',
        'count(trm.trm_id_int) as matriculados'
      ]
      this.turmaRepository.createQueryBuilder('trm')
        .select(campos)
        .innerJoin('trm.estudantesTurmas', 'etu')
        .where('trm.esc_id_int = :esc_id', { esc_id: esc_id })
        .andWhere('etu.etu_turma_atual_int = 1')
        .groupBy('trm.trm_id_int')
        .execute()
        .then(matriculados => {
          resolve(matriculados)
        }).catch(reason => {
          reject(reason)
        })
    })
  }


  public listarTurmasPorTurno(trn_id: number, esc_id: number, ano: number): Promise<Turma[]> {
    return new Promise((resolve, reject) => {
      const campos = ['trm_id_int as id', 'sre_abreviatura_txt as serie', 'trm_nome_txt as turma', 'trn_abreviatura_txt as turno'];
      if (trn_id >= 0) {
        this.turmaRepository
          .createQueryBuilder('trm')
          .select(campos)
          .innerJoin('trm.serie', 'sre')
          .innerJoin('trm.turno', 'trn')
          .andWhere('trm.trn_id_int = :trn_id', { trn_id: trn_id })
          .andWhere('trm.trm_ano_int = :ano', { ano: ano })
          .andWhere('trm.esc_id_int = :esc_id', { esc_id: esc_id })
          .orderBy('sre_abreviatura_txt', "ASC")
          .orderBy('trm_nome_txt', "ASC")
          .getRawMany().then((turmas: any[]) => {
            resolve(turmas)
          }).catch((reason: any) => {
            reject(reason);
          });
      } else {
        this.turmaRepository
          .createQueryBuilder('trm')
          .select(campos)
          .innerJoin('trm.serie', 'sre')
          .innerJoin('trm.turno', 'trn')
          .andWhere('trm.trm_ano_int = :ano', { ano: ano })
          .andWhere('trm.esc_id_int = :esc_id', { esc_id: esc_id })
          .orderBy('sre_abreviatura_txt', "ASC")
          .orderBy('trm_nome_txt', "ASC")
          .getRawMany().then((turmas: any[]) => {
            resolve(turmas)
          }).catch((reason: any) => {
            reject(reason);
          });
      }
    });


  }

  // Precisa de estudantes enturmados para verificar se está ok.
  public listarTurmasPorAno(ano: number, esc_id: number): Promise<Turma[]> {
    return new Promise((resolve, reject) => {
      this.turmaRepository.createQueryBuilder('trm').select([
        'trm.trm_id_int as id',
        'trm.trm_nome_txt as nome',
        'trm.sre_id_int as sre_id',
        'sre.sre_nome_txt as serie',
        'trm.trn_id_int as trn_id',
        'trn.trn_nome_txt as turno',
        'trm.trm_ano_int as ano',
        'trm.esc_id_int as esc_id',
        'esc.esc_nome_txt as escola',
        'ete.ete_abreviatura_txt as etapa',
        'count(est.est_id_int) as matriculados',
        'sre.sre_abreviatura_txt as serie_abv',
        'trn.trn_abreviatura_txt as turno_abv'
      ])
        .leftJoin('trm.serie', 'sre')
        .leftJoin('trm.turno', 'trn')
        .leftJoin('trm.escola', 'esc')
        .leftJoin('sre.etapa', 'ete')
        .leftJoin('trm.estudantesTurmas', 'etuete')
    })
  }

  /**
   * Lista turmas por escola
   * @param limit Quantidade
   * @param offset Paginação
   * @param asc Ordenamento
   * @param esc_id Id da escola
   */
  public listarTurmasPorEscola(limit: number, offset: number, asc: boolean, esc_id: number): Promise<TurmaPorEscolaDto[]> {
    return new Promise((resolve, reject) => {
      let total = 0;
      this.turmaRepository.createQueryBuilder('trm').innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('trm.escola', 'esc')
        .innerJoin('sre.etapaEnsino', 'ete')
        .orderBy(new Turma().nome, 'ASC')
        .where('esc.esc_id_int = :esc_id', { esc_id: esc_id }).getCount().then((count: number) => {
          total = count;
        }).then(() => {
          this.turmaRepository.createQueryBuilder('trm').select(['*'])
            .innerJoin('trm.serie', 'sre')
            .innerJoin('trm.turno', 'trn')
            .innerJoin('trm.escola', 'esc')
            .innerJoin('sre.etapaEnsino', 'ete')
            .orderBy(new Turma().nome, 'ASC')
            .where('esc.esc_id_int = :esc_id', { esc_id: esc_id })
            .limit(limit)
            .offset(offset)
            .getRawMany()
            .then((campos: TurmaPorEscolaDto[]) => {
              const camposMapeados = campos.map((campo: TurmaPorEscolaDto) => {
                const campoMapeado = new TurmaPorEscolaDto();
                campoMapeado.ano = campo['trm_ano_int']; campoMapeado.esc_id = campo['esc_id_int']; campoMapeado.escola = campo['esc_nome_txt'];
                campoMapeado.etapa = campo['ete_abreviatura_txt']; campoMapeado.id = campo['trm_id_int']; campoMapeado.nome = campo['trm_nome_txt'];
                campoMapeado.serie = campo['sre_nome_txt']; campoMapeado.sre_id = campo['sre_id_int']; campoMapeado.total = total;
                campoMapeado.trn_id = campo['trn_id_int']; campoMapeado.turno = campo['trn_nome_txt'];
                return campoMapeado;
              });
              resolve(camposMapeados);
            }).catch((reason: any) => {
              reject(reason);
            })
        }).catch((reason: any) => {
          reject(reason);
        });
    });
  }


  public filtrarTurmasPorNomeEscola(valor: string, limit: number, offset: number, esc_id: number): Promise<TurmaPorEscolaDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'trm.trm_id_int as id',
        'trm.trm_nome_txt as nome',
        'trm.sre_id_int as sre_id',
        'sre.sre_nome_txt as serie',
        'trm.trn_id_int as trn_id',
        'trn.trn_nome_txt as turno',
        'trm.trm_ano_int as ano',
        'trm.esc_id_int as esc_id',
        'esc.esc_nome_txt as escola',
        'ete.ete_abreviatura_txt as etapa'
      ];

      this.turmaRepository
        .createQueryBuilder('trm')
        .select(campos)
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('trm.escola', 'esc')
        .innerJoin('sre.etapaEnsino', 'ete')
        .orWhere('LOWER(esc.esc_nome_txt) like LOWER(:nome)', { nome: `%${valor}%` })
        .orWhere('LOWER(trn.trn_nome_txt) like LOWER(:nome)', { nome: `%${valor}%` })
        .orWhere('LOWER(sre.sre_nome_txt) like LOWER(:nome)', { nome: `%${valor}%` })
        .orWhere('trm.trm_ano_int = :ano', { ano: this.utils.TryParseInt(valor, 0) })
        .andWhere('trm.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('sre.sre_nome_txt', 'ASC')
        .orderBy('trm.trm_nome_txt', 'ASC')
        .orderBy('trm.trm_ano_int', 'ASC').getCount().then((total: number) => {

          this.turmaRepository
            .createQueryBuilder('trm')
            .select(campos)
            .innerJoin('trm.serie', 'sre')
            .innerJoin('trm.turno', 'trn')
            .innerJoin('trm.escola', 'esc')
            .innerJoin('sre.etapaEnsino', 'ete')
            .orWhere('LOWER(esc.esc_nome_txt) like LOWER(:nome)', { nome: `%${valor}%` })
            .orWhere('LOWER(trn.trn_nome_txt) like LOWER(:nome)', { nome: `%${valor}%` })
            .orWhere('LOWER(sre.sre_nome_txt) like LOWER(:nome)', { nome: `%${valor}%` })
            .orWhere('trm.trm_ano_int = :ano', { ano: this.utils.TryParseInt(valor, 0) })
            .andWhere('trm.esc_id_int = :esc_id', { esc_id: esc_id })
            .orderBy('sre.sre_nome_txt', 'ASC')
            .orderBy('trm.trm_nome_txt', 'ASC')
            .orderBy('trm.trm_ano_int', 'ASC')
            .limit(limit)
            .offset(offset)
            .getRawMany().then((turmasEscolaDto: TurmaPorEscolaDto[]) => {
              const turmasEscolaComTotal = turmasEscolaDto.map((turmaEscolaDto: TurmaPorEscolaDto) => {
                turmaEscolaDto.total = total;
                return turmaEscolaDto;
              });
              resolve(turmasEscolaComTotal)
            }).catch((reason: any) => {
              reject(reason);
            });
        });
    });
  }

  public listarTodasTurmas(): Promise<TurmaPorEscolaDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'trm.trm_id_int as id',
        'trm.trm_nome_txt as nome',
        'trm.sre_id_int as sre_id',
        'sre.sre_nome_txt as serie',
        'trm.trn_id_int as trn_id',
        'trn.trn_nome_txt as turno',
        'trm.trm_ano_int as ano',
        'trm.esc_id_int as esc_id',
        'esc.esc_nome_txt as escola',
        'ete.ete_abreviatura_txt as etapa'
      ];
      this.turmaRepository
        .createQueryBuilder('trm')
        .select(campos)
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('trm.escola', 'esc')
        .innerJoin('sre.etapaEnsino', 'ete')
        .getRawMany()
        .then((turmasEscolaDto: TurmaPorEscolaDto[]) => {
          resolve(turmasEscolaDto)
        }).catch((reason: any) => {
          reject(reason);
        });
    })
  }

  public async alterarTurma(turma: Turma): Promise<Turma> {
    return new Promise((resolve, reject) => {
      this.verificarExistenciaTurma(turma).then((existe: boolean) => {
        if (!existe) {
          this.turmaRepository.save(turma).then((turmaAlterada: Turma) => {
            resolve(turmaAlterada);
          }).catch((reason: any) => {
            reject(reason);
          });
        } else {
          resolve(null);
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    })
  }

  /**
   * Exclui uma turma por Id
   * @param id
   */
  public excluirTurma(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.turmaRepository.delete(id).then((deleteResult: DeleteResult) => {
        resolve(deleteResult);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public verificarExistenciaTurma(turma: Turma): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.turmaRepository.find({
        where: {
          nome: turma.nome,
          sre_id: turma.sre_id,
          trn_id: turma.trn_id,
          esc_id: turma.esc_id,
          ano: turma.ano
        }
      }).then((turmas: Turma[]) => {
        if (turmas.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public verificarExistenciaIntegracao(turma: TurmaIntegracaoNomeDto): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.turmaRepository.findByIds([turma.id]).then((turmas: Turma[]) => {
        if (turmas.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

}
