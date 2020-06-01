import { EscolaRepository } from './escola.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Escola } from './escola.entity';

@Injectable()
export class EscolaService {
  constructor(@InjectRepository(EscolaRepository) private escolaRepository: EscolaRepository) { }


  public pegarIdRegiaoEscolaPorEscolaId(esc_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.escolaRepository.findOne(esc_id).then((escola: Escola) => {
        resolve(escola.ree_id);
      }).catch((reason: any) => {
        reject(reason);
      });
    });
  }
}
