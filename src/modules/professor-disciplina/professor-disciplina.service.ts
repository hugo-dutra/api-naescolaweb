import { Utils } from './../../utils/utils';
import { ProfessorDisciplinaDto } from './professor-disciplina.dto';
import { ProfessorDisciplinaRepository } from './professor-disciplina.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from '../professor/professor.entity';
import { ProfessorDisciplina } from './professor-disciplina.entity';
import { ProfessorDisciplinaIntegracaoDto } from './dto/professor-disciplina-integracao.dto';
import { ProfessorService } from '../professor/professor.service';

@Injectable()
export class ProfessorDisciplinaService {
  private utils = new Utils();
  constructor(
    @InjectRepository(ProfessorDisciplinaRepository) private professorDisciplinaRepository: ProfessorDisciplinaRepository,
    private professorService: ProfessorService) { }

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

  public inserirIntegracao(professoresDisciplinasIntegracaoDto: ProfessorDisciplinaIntegracaoDto[]): Promise<ProfessorDisciplina> {
    return new Promise((resolve, reject) => {
      this.montarArrayProfessorDisciplinaIntegracao(professoresDisciplinasIntegracaoDto).then(professoresDisciplinasDto => {
        let professoresDisciplinas = 0;
        professoresDisciplinasDto.forEach(professorDisciplina => {
          this.verificarExistencia(professorDisciplina).then(existe => {

            professoresDisciplinas++;
            if (!existe) {
              this.professorDisciplinaRepository.save(professorDisciplina).then((professorDisciplinaInserido: ProfessorDisciplinaDto) => {
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
    });
  }

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
