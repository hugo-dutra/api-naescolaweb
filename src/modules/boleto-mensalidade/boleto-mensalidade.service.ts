import { BoletoMensalidade } from './boleto-mensalidade.entity';
import { BoletoMensalidadeRepository } from './boleto-mensalidade.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoletoMensalidadeService {
  constructor(@InjectRepository(BoletoMensalidadeRepository) private boletoMensalidadeRepository: BoletoMensalidadeRepository) { }

  public inserir(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const boletoMensalidade: BoletoMensalidade = params['boleto'];
      const esc_id: number = params['esc_id'];
      boletoMensalidade.esc_id = esc_id;
      this.boletoMensalidadeRepository.save(boletoMensalidade).then((boletoMensalidade) => {
        resolve({ last_insert_id: boletoMensalidade.id })
      }).catch(reason => {
        reject(reason);
      });
    })
  }

  public listar(ano: number, esc_id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const campos = [
        'bom.bom_id_int as id', 'bom.bom_code_int as code',
        'bom.bom_duedate_dte as dueDate', 'bom.bom_checkouturl_txt as checkoutUrl',
        'bom.bom_link_txt as link', 'bom.bom_installmentlink_txt as installmentLink',
        'bom.bom_paynumber_txt as payNumber', 'bom.bom_bankaccount_txt as bankAccount',
        'bom.bom_ournumber_txt as ourNumber', 'bom.bom_barcodenumber_txt as barcodeNumber',
        'bom.bom_portifolio_txt as portifolio', 'esc.esc_id_int as esc_id',
        'bom.bom_status_pagamento_int as status_pagamento',
        'extract(month from bom_duedate_dte) as mes'
      ]
      const query1 = this.boletoMensalidadeRepository.createQueryBuilder('bom')
        .select(campos)
        .innerJoin('bom.escola', 'esc')
        .where('extract(year from bom_duedate_dte) = :ano', { ano: ano })
        .andWhere(`extract(month from bom_duedate_dte) in (:...meses)`, { meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] })
        .andWhere('bom.esc_id_int = :esc_id', { esc_id: esc_id })
        .execute()
        .then((boletos: any[]) => {
          resolve(boletos);
        }).catch(reason => {
          reject(reason);
        })
    })
  }



}

