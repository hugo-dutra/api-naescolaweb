import { RedeEnsinoRepository } from './rede-ensino.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedeEnsino } from './rede-ensino.entity';

@Injectable()
export class RedeEnsinoService {
  constructor(@InjectRepository(RedeEnsinoRepository) private redeEnsinoRepository: RedeEnsinoRepository) { }

  /**
   * Insere rede de ensino
   * @param redeEnsino
   */
  public inserirRedeEnsino(redeEnsino: RedeEnsino): Promise<RedeEnsino> {
    return new Promise((resolve, reject) => {
      this.listarRedeEnsino().then((redeEnsinoListada: RedeEnsino) => {
        if (redeEnsinoListada != null) {
          redeEnsino.id = redeEnsinoListada.id;
        }
        this.redeEnsinoRepository.save(redeEnsino).then((redeEnsino: RedeEnsino) => {
          resolve(redeEnsino);
        }).catch((reason: any) => {
          reject(reason);
        });
      })
    });
  }

  /**
   * Lista todas as redes de ensino
   */
  public listarRedeEnsino(): Promise<RedeEnsino> {
    return new Promise((resolve, reject) => {
      this.redeEnsinoRepository.find().then((redesEnsino: RedeEnsino[]) => {
        if (redesEnsino.length > 0) {
          resolve(redesEnsino[0]);
        } else {
          resolve(null);
        }
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }

}
