import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Escola } from "../escola/escola.entity";

@Entity('boleto_mensalidade_bom')
export class BoletoMensalidade extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'bom_id_int' })
  id: number;
  @Column({ name: 'bom_code_int', comment: 'Código do boleto', nullable: true })
  code: number;
  @Column({ name: 'bom_duedate_dte', nullable: true, comment: 'Data de vencimento' })
  dueDate: Date;
  @Column({ name: 'bom_checkouturl_txt', nullable: true, length: 500 })
  checkoutUrl: string;
  @Column({ name: 'bom_link_txt', nullable: true, length: 500, comment: 'Link para download do PDF' })
  link: string;
  @Column({ name: 'bom_installmentlink_txt', nullable: true, length: 500 })
  installmentLink: string;
  @Column({ name: 'bom_paynumber_txt', nullable: true, length: 500 })
  payNumber: string;
  @Column({ name: 'bom_bankaccount_txt', nullable: true, length: 100 })
  bankAccount: string;
  @Column({ name: 'bom_ournumber_txt', nullable: true, length: 100 })
  ourNumber: string;
  @Column({ name: 'bom_barcodenumber_txt', nullable: true, length: 250 })
  barcodeNumber: string;
  @Column({ name: 'bom_portifolio_txt', nullable: true, length: 25 })
  portfolio: string;
  @Column({ name: 'bom_status_pagamento_int', nullable: true, default: 0 })
  status_pagamento: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Escola, escola => escola.boletosMensalidades)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
}