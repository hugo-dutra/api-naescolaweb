import { OperadorAlertaRepository } from './operador-alerta.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OperadorAlertaService {
  constructor(@InjectRepository(OperadorAlertaRepository) private operadorAlertaRepository: OperadorAlertaRepository) { }

  public listar(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'opa.opa_id_int as opa_id',
        'opa.opa_operador_txt as operador',
        'opa.opa_simbolo_txt as simbolo'
      ];
      this.operadorAlertaRepository.createQueryBuilder('opa')
        .select(campos)
        .execute()
        .then(operadores => {
          resolve(operadores);
        }).catch(reason => {
          reject(reason);
        });
    })
  }


}

