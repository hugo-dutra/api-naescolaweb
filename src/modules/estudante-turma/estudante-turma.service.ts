import { EstudanteIntegracaoEnturmarDto } from './dto/estudante-integracao-enturmar.dto';
import { EstudanteTurmaRepository } from './estudante-turma.repository';
import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { EstudanteRepository } from '../estudante/estudante.repository';
import { EstudanteTurma } from './estudante-turma.entity';

@Injectable()
export class EstudanteTurmaService {
  constructor(
    private estudanteTurmaRepository: EstudanteTurmaRepository,
    private estudanteRepository: EstudanteRepository) { }

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
          })
        })
      });
    })
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

  /**
   * Desativa o status ativo em todas as turmas do estudante para ativar numa nova
   * @param estudantesIntegracaoEnturmarDto
   */
  public marcarEstudantesComStatusTurmaAtualZero(estudantesIntegracaoEnturmarDto: EstudanteIntegracaoEnturmarDto[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let contaExecucao = 0;
      estudantesIntegracaoEnturmarDto.forEach((estudante: EstudanteIntegracaoEnturmarDto) => {
        this.estudanteTurmaRepository.createQueryBuilder('etu').update().set({ etu_turma_atual: 0 }).where("est_id_int = :id", { id: estudante.id }).execute().then((updateResult: UpdateResult) => {
          contaExecucao++;
          if (contaExecucao == estudantesIntegracaoEnturmarDto.length) {
            resolve();
          }
        });
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
        this.estudanteRepository.createQueryBuilder('etu').update().set({ esc_id: esc_id }).where("est_id_int = :id", { id: estudante.id }).execute().then((updateResult: UpdateResult) => {
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
          estudantesTurmas[0].etu_turma_atual = 1;
          estudantesTurmas[0].save();
          resolve();
        } else {
          const estudanteTurma = new EstudanteTurma();
          estudanteTurma.est_id = estudanteIntegracaoEnturmarDto.id;
          estudanteTurma.trm_id = estudanteIntegracaoEnturmarDto.trm_id
          estudanteTurma.etu_numero_chamada = 0;
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
              estudanteTurma.etu_turma_atual = 0;
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





}
