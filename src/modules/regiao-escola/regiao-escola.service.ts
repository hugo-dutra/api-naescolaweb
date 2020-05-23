import { RegiaoEscolaRepository } from './regiao-escola.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegiaoEscola } from './regiao-escola.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class RegiaoEscolaService {
  constructor(@InjectRepository(RegiaoEscolaRepository) private regiaoEscolaRepository: RegiaoEscolaRepository) { }

  /**
   * Nota região escola
   * @param regiaoEscola
   */
  public inserirRegiaoEscola(regiaoEscola: RegiaoEscola): Promise<RegiaoEscola> {
    return new Promise((resolve, reject) => {
      this.verificarExistenciaRegiaoEscolaNomeRegiao(regiaoEscola).then((existe: boolean) => {
        if (!existe) {
          this.regiaoEscolaRepository.save(regiaoEscola).then((regiaoEscola: RegiaoEscola) => {
            resolve(regiaoEscola);
          }).catch((reason: any) => {
            reject(reason);
          });
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Lista todas as regiões de escola
   */
  public listarRegiaoEscola(): Promise<RegiaoEscola[]> {
    return new Promise((resolve, reject) => {
      this.regiaoEscolaRepository.find().then((regioesEscolas: RegiaoEscola[]) => {
        resolve(regioesEscolas);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  /**
   * Altera região escola
   * @param regiaoEscola
   */
  public alterarRegiaoEscola(regiaoEscola: RegiaoEscola): Promise<RegiaoEscola> {
    return new Promise((resolve, reject) => {
      this.verificarExistenciaRegiaoEscolaNomeRegiao(regiaoEscola).then((existe: boolean) => {
        if (!existe) {
          this.regiaoEscolaRepository.save(regiaoEscola).then((regiaoEscola: RegiaoEscola) => {
            resolve(regiaoEscola);
          }).catch((reason: any) => {
            reject(reason);
          });
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Exclui região escola por Id
   * @param id
   */
  public excluirRegiaoEscola(id: number): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.regiaoEscolaRepository.delete(id).then((deleteResult: DeleteResult) => {
        resolve(deleteResult);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

  /**
   * Verifica se existe região com o nesmo nome para esse UF
   * @param regiaoEscola
   */
  public verificarExistenciaRegiaoEscolaNomeRegiao(regiaoEscola: RegiaoEscola): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.regiaoEscolaRepository.find({ where: { nome: regiaoEscola.nome, uf: regiaoEscola.uf } }).then((regioesEscolas: RegiaoEscola[]) => {
        if (regioesEscolas.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch((reason: any) => {
        reject(reason);
      })
    });
  }
}
