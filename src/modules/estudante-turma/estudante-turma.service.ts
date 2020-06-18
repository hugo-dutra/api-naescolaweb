import { EstudanteService } from './../estudante/estudante.service';
import { EstudanteIntegracaoEnturmarDto } from './dto/estudante-integracao-enturmar.dto';
import { EstudanteTurmaRepository } from './estudante-turma.repository';
import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { EstudanteRepository } from '../estudante/estudante.repository';
import { EstudanteTurma } from './estudante-turma.entity';
import { EstudanteImportacaoDto } from './dto/estudante-importacao.dto';

@Injectable()
export class EstudanteTurmaService {
  constructor(
    private estudanteTurmaRepository: EstudanteTurmaRepository,
    private estudanteRepository: EstudanteRepository,
  ) { }

  /**
   * Vincula estudantes as turmas
   * @param estudantesIntegracaoEnturmarDto
   * @param esc_id
   */
  public inserirIntegracao(estudantesIntegracaoEnturmarDto: EstudanteIntegracaoEnturmarDto[], esc_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.marcarEstudantesComStatusTurmaAtualZero(estudantesIntegracaoEnturmarDto).then(() => {
        this.atualizarEscolaEstudante(estudantesIntegracaoEnturmarDto, esc_id).then(() => {
          this.enturmarEstudantes(estudantesIntegracaoEnturmarDto).then(() => {
            resolve(null);
          }).catch(reason => {
            reject(reason);
          });
        }).catch(reason => {
          reject(reason);
        });
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public enturmar(dados: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const estudantes = Array.from(dados['estudantes']);
      const trm_id = dados['trm_id'];
      let enturmados = 0;
      estudantes.forEach((estudante: number) => {
        const estudanteTurma = new EstudanteTurma();
        estudanteTurma.trm_id = trm_id;
        estudanteTurma.est_id = estudante;
        this.estudanteTurmaRepository.save(estudanteTurma).then(novoEstudanteTurma => {
          enturmados++;
          if (enturmados == estudantes.length) {
            resolve();
          }
        }).catch(reason => {
          reject(reason);
        });
      });
    });
  }

  public inserirViaImportacao(estudantes: EstudanteImportacaoDto[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const esc_id = estudantes[0].esc_id;
      this.pegarIdsPorMatriculas(estudantes).then(estudantesIntegracaoEnturmarDto => {
        this.marcarEstudantesComStatusTurmaAtualZero(estudantesIntegracaoEnturmarDto).then(() => {
          this.atualizarEscolaEstudante(estudantesIntegracaoEnturmarDto, esc_id).then(() => {
            this.enturmarEstudantes(estudantesIntegracaoEnturmarDto).then(() => {
              resolve(null);
            }).catch(reason => {
              reject(reason);
            });
          }).catch(reason => {
            reject(reason);
          });
        }).catch(reason => {
          reject(reason);
        });
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  public alterarManualNumeroChamada(dados: any): Promise<UpdateResult> {
    return new Promise((resolve, reject) => {
      const est_id = dados['est_id'];
      const trm_id = dados['trm_id'];
      const numero_chamada = dados['numero_chamada'];
      this.estudanteTurmaRepository.createQueryBuilder('etu')
        .update()
        .set({ numero_chamada: numero_chamada })
        .where('est_id_int = :est_id', { est_id: est_id })
        .andWhere('trm_id_int = :trm_id', { trm_id: trm_id })
        .execute()
        .then(updateResult => {
          resolve(updateResult);
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public pegarIdsPorMatriculas(estudantes: EstudanteImportacaoDto[]): Promise<EstudanteIntegracaoEnturmarDto[]> {
    return new Promise((resolve, reject) => {
      let matriculasRecuperadas = 0;
      const arrayDeEstudanteTurma = new Array<EstudanteIntegracaoEnturmarDto>();
      estudantes.forEach(estudante => {
        this.estudanteRepository.find({ where: { matricula: estudante.matricula } }).then(est => {
          matriculasRecuperadas++;
          const estudanteTurma = new EstudanteIntegracaoEnturmarDto();
          estudanteTurma.id = est[0].id;
          estudanteTurma.trm_id = estudante.trm_id;
          estudanteTurma.numero_chamada = parseInt(estudante.numero);
          arrayDeEstudanteTurma.push(estudanteTurma);
          if (matriculasRecuperadas == estudantes.length) {
            resolve(arrayDeEstudanteTurma)
          }
        }).catch(reason => {
          reject(reason);
        });
      });
    });
  }

  /**
   * Enturma estudantes
   * @param estudantesIntegracaoEnturmarDto
   */
  public enturmarEstudantes(estudantesIntegracaoEnturmarDto: EstudanteIntegracaoEnturmarDto[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let contaEnturmados = 0;
      estudantesIntegracaoEnturmarDto.forEach((estudante: EstudanteIntegracaoEnturmarDto) => {
        this.verificarAtualizarEnturmar(estudante).then(() => {
          contaEnturmados++;
          if (contaEnturmados == estudantesIntegracaoEnturmarDto.length) {
            resolve();
          }
        }).catch((reason: any) => {
          reject(reason);
        })
      });
    });
  }

  public desenturmarEstudante(est_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.estudanteTurmaRepository.createQueryBuilder('etu')
        .update()
        .set({ turma_atual: 0 })
        .where("est_id_int = :id", { id: est_id })
        .execute()
        .then(() => {
          resolve()
        }).catch(reason => {
          reject(reason);
        });
    })
  }

  public listarSerieTurmaTurnoEtapa(est_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const campos = [
        'etu.est_id_int as est_id',
        'sre.sre_abreviatura_txt as serie',
        'trm.trm_nome_txt as turma',
        'trn.trn_abreviatura_txt as turno',
        'ete.ete_nome_txt as etapa'
      ];
      this.estudanteTurmaRepository.createQueryBuilder('etu').select(campos)
        .innerJoin('etu.turma', 'trm')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('trm.turno', 'trn')
        .innerJoin('sre.etapaEnsino', 'ete')
        .where('etu.est_id_int = :est_id', { est_id: est_id })
        .andWhere('etu_turma_atual_int = 1')
        .execute()
        .then(retorno => {
          resolve(retorno);
        }).catch(reason => {
          reject(reason);
        });
    });
  }

  /**
   * Desativa o status ativo em todas as turmas do estudante para ativar numa nova
   * @param estudantesIntegracaoEnturmarDto
   */
  public marcarEstudantesComStatusTurmaAtualZero(estudantesIntegracaoEnturmarDto: EstudanteIntegracaoEnturmarDto[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let contaExecucao = 0;
      estudantesIntegracaoEnturmarDto.forEach((estudante: EstudanteIntegracaoEnturmarDto) => {
        this.estudanteTurmaRepository.createQueryBuilder('etu').update().set({ turma_atual: 0 }).where("est_id_int = :id", { id: estudante.id }).execute().then(() => {
          contaExecucao++;
          if (contaExecucao == estudantesIntegracaoEnturmarDto.length) {
            resolve();
          }
        }).catch(reason => {
          reject(reason);
        })
      });
    });
  };

  /**
   * Atualiza a escola associada ao estudante
   * @param estudantesIntegracaoEnturmarDto
   * @param esc_id
   */
  public atualizarEscolaEstudante(estudantesIntegracaoEnturmarDto: EstudanteIntegracaoEnturmarDto[], esc_id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let contaExecucao = 0;
      estudantesIntegracaoEnturmarDto.forEach((estudante: EstudanteIntegracaoEnturmarDto) => {
        this.estudanteRepository.createQueryBuilder('est').update().set({ esc_id: esc_id }).where("est_id_int = :id", { id: estudante.id }).execute().then((updateResult: UpdateResult) => {
          contaExecucao++;
          if (contaExecucao == estudantesIntegracaoEnturmarDto.length) {
            resolve();
          }
        });
      });
    });
  }

  /**
   * Verifica enturmacao anterior. Se existe, realoca, senão, insere nova enturmacao
   * @param estudanteIntegracaoEnturmarDto
   */
  public verificarAtualizarEnturmar(estudanteIntegracaoEnturmarDto: EstudanteIntegracaoEnturmarDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.estudanteTurmaRepository.find({ where: { est_id: estudanteIntegracaoEnturmarDto.id, trm_id: estudanteIntegracaoEnturmarDto.trm_id } }).then((estudantesTurmas: EstudanteTurma[]) => {
        if (estudantesTurmas.length == 1) {
          estudantesTurmas[0].turma_atual = 1;
          estudantesTurmas[0].save();
          resolve();
        } else {
          const estudanteTurma = new EstudanteTurma();
          estudanteTurma.est_id = estudanteIntegracaoEnturmarDto.id;
          estudanteTurma.trm_id = estudanteIntegracaoEnturmarDto.trm_id
          estudanteTurma.numero_chamada = 0;
          estudanteTurma.save().then(() => {
            resolve()
          }).catch((reason: any) => {
            reject(reason)
          });
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  /**
   * Desativa estudantes que não estão mais na escola para as turmas da escola
   * @param esc_id
   * @param listaEstId
   */
  public desabilitarTransferidos(esc_id: number, listaEstId: number[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (listaEstId.length != 0) {
        let contaAtualizados = 0;
        listaEstId.forEach((estId) => {
          this.estudanteTurmaRepository
            .createQueryBuilder('etu')
            .innerJoin('etu.turma', 'trm')
            .select(['etu.etu_id_int as id, etu.etu_numero_chamada_int as etu_numero_chamada, etu.etu_turma_atual_int as etu_turma_atual, etu.est_id_int as est_id, trm.trm_id_int as trm_id'])
            .andWhere('trm.esc_id_int = :esc_id', { esc_id: esc_id }).andWhere('etu.est_id_int = :est_id', { est_id: estId }).execute().then((estudanteTurma: EstudanteTurma) => {
              contaAtualizados++;
              estudanteTurma.turma_atual = 0;
              this.estudanteTurmaRepository.save(estudanteTurma).then((estudanteDesativado: EstudanteTurma) => {
                if (contaAtualizados == listaEstId.length) {
                  resolve();
                }
              });
            });
        });
      } else {
        resolve();
      }
    });
  }

  public alterarTurma(dados: any): Promise<void> {
    const trm_id = parseInt(dados['trm_id']);
    const estudantesTurma = (<any[]>dados['estudantes']).map(estudante => {
      return { id: estudante['id'], trm_id: trm_id }
    });
    return new Promise((resolve, reject) => {
      let contaAlteradas = 0;
      estudantesTurma.forEach(estudanteTurma => {
        this.mudarStatusEnturmacoesAnteriores(estudanteTurma['id'], false).then(updateResult => {
          let estudante = new EstudanteIntegracaoEnturmarDto();
          estudante.id = estudanteTurma.id;
          estudante.trm_id = estudanteTurma.trm_id
          this.verificarAtualizarEnturmar(estudante).then(() => {
            contaAlteradas++;
            if (contaAlteradas == estudantesTurma.length) {
              resolve();
            }
          }).catch(reason => {
            reject(reason)
          })
        }).catch(reason => {
          reject(reason);
        })
      })
    })
  }

  public mudarStatusEnturmacoesAnteriores(est_id: number, ativa: boolean): Promise<UpdateResult> {
    return new Promise((resolve, reject) => {
      this.estudanteTurmaRepository.createQueryBuilder('etu')
        .update()
        .set({ turma_atual: ativa == true ? 1 : 0 })
        .where('est_id_int = :est_id', { est_id: est_id })
        .execute()
        .then(updateResult => {
          resolve(updateResult);
        }).catch(reason => {
          reject(reason);
        });
    });
  }



}
