import { ProfessorEscola } from './professor-escola.entity';
import { ProfessorService } from './../professor/professor.service';
import { ProfessorEscolaRepository } from './professor-escola.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorIntegracaoDto } from '../professor/dto/professor-integracao.dto';
import { Professor } from '../professor/professor.entity';

@Injectable()
export class ProfessorEscolaService {
  constructor(
    @InjectRepository(ProfessorEscolaRepository) private professorEscolaRepository: ProfessorEscolaRepository,
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

}
