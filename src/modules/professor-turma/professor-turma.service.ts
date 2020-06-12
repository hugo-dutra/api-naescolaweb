import { ProfessorDisciplinaService } from './../professor-disciplina/professor-disciplina.service';
import { ProfessorService } from './../professor/professor.service';
import { ProfessorTurmaIntegracaoDto } from './dto/professor-turma-integracao.dto';
import { ProfessorTurmaRepository } from './professor-turma.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorDisciplinaTurmaEscola } from './dto/professor-turma-escola.dto';
import { ProfessorTurma } from './professor-turma.entity';
import { ProfessorTurmaDisciplinaDto } from './dto/professor-turma-disciplina.dto';

@Injectable()
export class ProfessorTurmaService {
  constructor(
    @InjectRepository(ProfessorTurmaRepository) private ProfessorTurmaRepository: ProfessorTurmaRepository,
    private professorService: ProfessorService,
    private professorDisciplinaService: ProfessorDisciplinaService,
  ) { }

  public listarProfessorDisciplina(prd_id: number, esc_id: number): Promise<ProfessorTurmaDisciplinaDto[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'prt.prd_id_int as prd_id',
        'prt.trm_id_int as trm_id',
        'sre.sre_nome_txt as serie',
        'ete.ete_nome_txt as etapa',
        'trm.trm_nome_txt as turma',
        'trn.trn_nome_txt as turno'
      ];
      this.ProfessorTurmaRepository.createQueryBuilder('prt').select(campos)
        .innerJoin('prt.turma', 'trm')
        .innerJoin('trm.serie', 'sre')
        .innerJoin('sre.etapaEnsino', 'ete')
        .innerJoin('trm.turno', 'trn')
        .where('prt.prd_id_int = :prd_id', { prd_id: prd_id })
        .andWhere('prt.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then((professorTurmaDisciplinaDto: ProfessorTurmaDisciplinaDto[]) => {
          resolve(professorTurmaDisciplinaDto);
        }).catch((reason: any) => {
          reject(reason);
        });
    })
  }

  public inserir(professoresDisciplinasTurmas: ProfessorDisciplinaTurmaEscola[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let contaInteracoes = 0;
      professoresDisciplinasTurmas.forEach(professorDisciplinaTurmaEscola => {
        contaInteracoes++;
        this.verificarExistencia(professorDisciplinaTurmaEscola).then(existe => {
          if (!existe) {
            const professorTurma = new ProfessorTurma();
            professorTurma.esc_id = professorDisciplinaTurmaEscola.esc_id;
            professorTurma.prd_id = professorDisciplinaTurmaEscola.prd_id;
            professorTurma.trm_id = professorDisciplinaTurmaEscola.trm_id;
            professorTurma.conselheiro = false;
            this.ProfessorTurmaRepository.save(professorTurma).then(() => { }).catch(reason => {
              reject(reason);
            });
          }
          if (contaInteracoes == professoresDisciplinasTurmas.length) {
            resolve();
          }
        });
      });
    });
  }

  /**
   * Vincular professores, disciplinas e turmas vindos do IEducar
   * @param professoresTurmas
   */
  public inserirIntegracao(professoresTurmas: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const professoresTurmasIntegracaoDto = <ProfessorTurmaIntegracaoDto[]>professoresTurmas;
      this.listarProfessorDisciplinaPorMatricula(professoresTurmasIntegracaoDto).then(professoresTurmasIntegracaoDto => {
        this.gerarArrayComProfessorDisciplinaTurma(professoresTurmasIntegracaoDto).then((professoresDisciplinasTurmasEscola: ProfessorDisciplinaTurmaEscola[]) => {
          let contaInteracoes = 0;
          professoresDisciplinasTurmasEscola.forEach(professorDisciplinaTurmaEscola => {
            contaInteracoes++;
            this.verificarExistencia(professorDisciplinaTurmaEscola).then(existe => {
              if (!existe) {
                const professorTurma = new ProfessorTurma();
                professorTurma.esc_id = professorDisciplinaTurmaEscola.esc_id;
                professorTurma.prd_id = professorDisciplinaTurmaEscola.prd_id;
                professorTurma.trm_id = professorDisciplinaTurmaEscola.trm_id;
                professorTurma.conselheiro = false;
                this.ProfessorTurmaRepository.save(professorTurma).then(() => { }).catch(reason => {
                  reject(reason);
                });
              }
              if (contaInteracoes == professoresDisciplinasTurmasEscola.length) {
                resolve();
              }
            });
          });
        }).catch((reason: any) => {
          reject(reason);
        });
      }).catch(reason => {
        reject(reason)
      });
    });
  }

  public verificarExistencia(professorDisciplinaTurmaEscola: ProfessorDisciplinaTurmaEscola): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.ProfessorTurmaRepository.find({ where: { esc_id: professorDisciplinaTurmaEscola.esc_id, trm_id: professorDisciplinaTurmaEscola.trm_id, prd_id: professorDisciplinaTurmaEscola.prd_id } }).then(valores => {
        if (valores.length != 0) {
          resolve(true)
        } else {
          resolve(false);
        }
      }).catch((reason: any) => {
        reject(reason);
      })
    })
  }

  public listarProfessorDisciplinaPorMatricula(professoresTurmasIntegracaoDto: ProfessorTurmaIntegracaoDto[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let contaInteracao = 0;
      const arrayDeProfessorTurma = new Array<ProfessorTurmaIntegracaoDto>()
      professoresTurmasIntegracaoDto.forEach(professorTurmaIntegracaoDto => {
        this.professorService.pegarIdPorMatricula(professorTurmaIntegracaoDto.matricula).then(prf_id => {
          contaInteracao++
          professorTurmaIntegracaoDto.prf_id = prf_id;
          arrayDeProfessorTurma.push(professorTurmaIntegracaoDto);
          if (contaInteracao == professoresTurmasIntegracaoDto.length) {
            resolve(professoresTurmasIntegracaoDto);
          }
        }).catch((reason: any) => {
          reject(reason);
        });
      });
    });
  }

  public gerarArrayComProfessorDisciplinaTurma(professoresTurmasIntegracaoDto: ProfessorTurmaIntegracaoDto[]): Promise<ProfessorDisciplinaTurmaEscola[]> {
    return new Promise((resolve, reject) => {
      const arrayPrdTrm = new Array<ProfessorDisciplinaTurmaEscola>();
      let contaInteracoes = 0;
      professoresTurmasIntegracaoDto.forEach(professorTurmaIntegracaoDto => {
        this.professorDisciplinaService.pegarPrdIdPorDisciplinaProfessor(professorTurmaIntegracaoDto.dsp_id, professorTurmaIntegracaoDto.prf_id).then(professorDisciplina => {
          contaInteracoes++;
          arrayPrdTrm.push({ trm_id: professorTurmaIntegracaoDto.trm_id, prd_id: professorDisciplina.id, esc_id: professorTurmaIntegracaoDto.esc_id });
          if (contaInteracoes == professoresTurmasIntegracaoDto.length) {
            resolve(arrayPrdTrm);
          }
        });
      });
    });
  }

}

