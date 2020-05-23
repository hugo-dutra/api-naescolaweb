import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TurmaRepository } from './turma.repository';
import { Turma } from './turma.entity';
import { TurmaPorEscolaDto } from './dto/turma-escola.dto';

@Injectable()
export class TurmaService {
  constructor(@InjectRepository(TurmaRepository) private turmaRepository: TurmaRepository) { }

  /**
   * Insere novas turmas
   * @param turma
   */
  public inserirTurma(turmas: Turma[]): Promise<Turma[]> {
    const notasTurmas = new Array<Turma>();
    return new Promise((resolve, reject) => {
      let contaTurma = 0;
      turmas.forEach((turma: Turma) => {
        contaTurma++;
        this.verificarExistenciaTurma(turma).then((existe: boolean) => {
          if (!existe) {
            this.turmaRepository.save(turma).then((novaTurma: Turma) => {
              notasTurmas.push(novaTurma);
              if (contaTurma == turmas.length) {
                resolve(notasTurmas);
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
   * Lista turmas por escola
   * @param limit Quantidade
   * @param offset Paginação
   * @param asc Ordenamento
   * @param esc_id Id da escola
   */
  public listarTurmasPorEscola(limit: number, offset: number, asc: boolean, esc_id: number): Promise<TurmaPorEscolaDto[]> {
    return new Promise((resolve, reject) => {
      let total = 0;
      this.turmaRepository.createQueryBuilder('trm').getCount().then((count: number) => {
        total = count;
      }).then(() => {
        this.turmaRepository.createQueryBuilder('trm').select(['*'])
          .innerJoin('trm.serie', 'sre')
          .innerJoin('trm.turno', 'trn')
          .innerJoin('trm.escola', 'esc')
          .innerJoin('sre.etapaEnsino', 'ete')
          .orderBy(new Turma().nome, 'ASC')
          .limit(limit)
          .offset(offset)
          .getRawMany()
          .then((campos: TurmaPorEscolaDto[]) => {
            const camposMapeados = campos.map((campo: TurmaPorEscolaDto) => {
              const campoMapeado = new TurmaPorEscolaDto();
              campoMapeado.ano = campo['trm_ano_int']; campoMapeado.esc_id = campo['esc_id_int']; campoMapeado.escola = campo['esc_nome_txt'];
              campoMapeado.etapa = campo['ete_abreviatura_txt']; campoMapeado.id = campo['trm_id_int']; campoMapeado.nome = campo['trn_nome_txt'];
              campoMapeado.serie = campo['sre_nome_txt']; campoMapeado.sre_id = campo['sre_id_int']; campoMapeado.total = total;
              campoMapeado.trn_id = campo['trn_id_int']; campoMapeado.turno = campo['trn_nome_txt'];
              return campoMapeado;
            });
            console.log(camposMapeados);
            resolve(camposMapeados);
          }).catch((reason: any) => {
            reject(reason);
          })
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

}
