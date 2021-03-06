import { EtapaEnsinoDto } from './dto/etapa-ensino.dto';
import { EtapaEnsino } from './etapa-ensino.entity';
import { EtapaEnsinoRepository } from './etapa-ensino.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class EtapaEnsinoService {
  constructor(@InjectRepository(EtapaEnsinoRepository) private etapaEnsinoRepository: EtapaEnsinoRepository) { }

  public inserirEtapaEnsino(etapaEnsinoDto: EtapaEnsinoDto): Promise<InsertResult> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.insert(etapaEnsinoDto).then((insertResult: InsertResult) => {
        resolve(insertResult);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public inserirEtapaEnsinoIntegracao(etapasEnsinoDto: EtapaEnsinoDto[]): Promise<EtapaEnsinoDto[]> {
    return new Promise((resolve, reject) => {
      let contaEtapasInseridas = 0;
      let arrayEtapasInseridas = new Array<EtapaEnsinoDto>();
      etapasEnsinoDto.forEach((etapaEnsinoDto: EtapaEnsinoDto) => {
        this.verificarExistencia(etapaEnsinoDto).then((existe: boolean) => {
          contaEtapasInseridas++
          if (!existe) {
            const queryString = 'insert into etapa_ensino_ete (ete_id_int, ete_nome_txt,ete_abreviatura_txt) values ($1, $2, $3)'
            this.etapaEnsinoRepository.query(queryString,
              [etapaEnsinoDto.id, etapaEnsinoDto.nome, etapaEnsinoDto.abreviatura])
              .then(() => {
                arrayEtapasInseridas.push(etapaEnsinoDto);
                if (contaEtapasInseridas == etapasEnsinoDto.length) {
                  resolve(arrayEtapasInseridas);
                }
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



  public listarEtapasEnsino(): Promise<EtapaEnsino[]> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.find().then((etapasEnsino: EtapaEnsino[]) => {
        resolve(etapasEnsino);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public listarEtapasEnsinoPorId(id: number[]): Promise<EtapaEnsino[]> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.findByIds(id).then((etapasEnsino: EtapaEnsino[]) => {
        resolve(etapasEnsino);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  public verificarExistencia(etapaEnsinoDto: EtapaEnsinoDto): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.findByIds([etapaEnsinoDto.id]).then((etapasEnsinoEncontradas: EtapaEnsino[]) => {
        if (etapasEnsinoEncontradas.length == 0) {
          resolve(false)
        } else {
          resolve(true)
        }
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }

  public alterarEtapaEnsino(etapaEnsinoDto: EtapaEnsinoDto): Promise<EtapaEnsinoDto> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.save(etapaEnsinoDto).then((etapaEnsinoDto: EtapaEnsinoDto) => {
        resolve(etapaEnsinoDto);
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }

  public excluirEtapaEnsino(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.etapaEnsinoRepository.delete(id).then((deleteResult: DeleteResult) => {
        resolve(deleteResult);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }


}
