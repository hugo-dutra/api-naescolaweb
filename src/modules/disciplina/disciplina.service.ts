import { DisciplinaRepository } from './disciplina.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Disciplina } from './disciplina.entity';
import { DeleteResult } from 'typeorm';
import { DisciplinaIntegracaoDto } from './dto/disciplina-integracao.dto';
import { Utils } from 'src/utils/utils';

@Injectable()
export class DisciplinaService {
  private utils = new Utils();
  constructor(@InjectRepository(DisciplinaRepository) private disciplinaRepository: DisciplinaRepository) { }

  public inserir(disciplina: Disciplina): Promise<Disciplina> {
    return new Promise((resolve, reject) => {
      this.verificaExistencia(disciplina).then(existe => {
        if (!existe) {
          this.disciplinaRepository.save(disciplina).then((novaDisciplina: Disciplina) => {
            resolve(novaDisciplina);
          }).catch((reason: any) => {
            reject(reason);
          })
        } else {
          resolve(null);
        }
      });
    });
  }

  public inserirIntegracao(disciplinasIntegracao: DisciplinaIntegracaoDto[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const disciplinasIntegracaoMapeadas = disciplinasIntegracao.map(disciplinaIntegracao => {
        const disciplinaMapeada = new Disciplina();
        const tamanho = disciplinaIntegracao.nm_disciplina.split(' ').length;
        if (tamanho > 1) {
          disciplinaMapeada.abreviatura = this.utils.extrairSubString(disciplinaIntegracao.nm_disciplina, 5)
            + ' ' + this.utils.abreviarStringComIniciais(disciplinaIntegracao.nm_disciplina);
        } else {
          disciplinaMapeada.abreviatura = this.utils.extrairSubString(disciplinaIntegracao.nm_disciplina, 3);
        }
        disciplinaMapeada.arc_id = 1;
        disciplinaMapeada.ete_id = disciplinaIntegracao.ref_cod_curso;
        disciplinaMapeada.id = disciplinaIntegracao.cod_disciplina
        disciplinaMapeada.nome = disciplinaIntegracao.nm_disciplina;
        return disciplinaMapeada;
      });

      const queryString = 'insert into disciplina_dsp ' +
        '( ' +
        'dsp_nome_txt, ' + 'dsp_abreviatura_txt, ' + 'arc_id_int, ' +
        'dsp_id_int,' + 'ete_id_int ' + ') values ($1, $2, $3, $4, $5)';

      let contaDisciplinasInseridas = 0;
      disciplinasIntegracaoMapeadas.forEach(disciplinaMapeada => {
        this.verificaExistencia(disciplinaMapeada).then(existe => {
          contaDisciplinasInseridas++;
          if (!existe) {
            this.disciplinaRepository.query(queryString,
              [disciplinaMapeada.nome, disciplinaMapeada.abreviatura,
              disciplinaMapeada.arc_id, disciplinaMapeada.id, disciplinaMapeada.ete_id])
              .then(() => {
                if (contaDisciplinasInseridas == disciplinasIntegracaoMapeadas.length) {
                  resolve()
                }
              }).catch((reason: any) => {
                reject(reason);
              });
          } else {
            if (contaDisciplinasInseridas == disciplinasIntegracaoMapeadas.length) {
              resolve()
            }
          }
        });
      });
    });
  }

  public listar(esc_id: number): Promise<Disciplina[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'dsp.dsp_id_int as id', 'dsp.dsp_nome_txt as nome', 'dsp.dsp_abreviatura_txt as abreviatura',
        'dsp.arc_id_int as arc_id', 'arc.arc_nome_txt as area_conhecimento', 'arc.arc_abreviatura_txt as area_conhecimento_abv',
        'ete.ete_id_int as ete_id', 'ete.ete_nome_txt as etapa', 'ete.ete_abreviatura_txt as etapa_abrv'
      ];
      this.disciplinaRepository.createQueryBuilder('dsp').select(campos)
        .innerJoin('dsp.areaConhecimento', 'arc')
        .innerJoin('dsp.etapaEnsino', 'ete')
        .innerJoin('ete.series', 'sre')
        .innerJoin('sre.turmas', 'trm')
        .where('dsp.ete_id_int =  ete.ete_id_int')
        .andWhere('trm.esc_id_int = :esc_id', { esc_id: esc_id })
        .orderBy('dsp.dsp_nome_txt', 'ASC').execute()
        .then((disciplinas: any[]) => {
          const disciplinasComDistinct = <Disciplina[]>this.utils.eliminaValoresRepetidos(disciplinas, 'id');
          resolve(disciplinasComDistinct);
        }).catch((reason: any) => {
          reject(reason)
        })
    })
  }

  public listarIntegracao(esc_id: number): Promise<Disciplina[]> {
    return new Promise((resolve, reject) => {
      resolve(null);
    })
  }

  public alterar(disciplina: Disciplina): Promise<Disciplina> {
    return new Promise((resolve, reject) => {
      this.disciplinaRepository.save(disciplina)
        .then((disciplinaAlterada: Disciplina) => {
          resolve(disciplinaAlterada);
        }).catch((reason: any) => {
          reject(reason);
        })
    })
  }

  public excluir(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.disciplinaRepository.delete(id)
        .then((deleteResult: DeleteResult) => {
          resolve(deleteResult);
        }).catch((reason: any) => {
          reject(reason);
        })
    })
  }

  public verificaExistencia(disciplina: Disciplina): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.disciplinaRepository
        .find({ where: { nome: disciplina.nome, ete_id: disciplina.ete_id } })
        .then((disciplinas: Disciplina[]) => {
          if (disciplinas.length != 0) {
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
