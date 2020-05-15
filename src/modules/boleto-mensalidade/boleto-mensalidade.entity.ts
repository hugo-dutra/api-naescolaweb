import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Escola } from "../escola/escola.entity";

@Entity('boleto_mensalidade_bom')
export class BoletoMensalidade extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'bom_id_int' })
  id: number;
  @Column({ name: 'bom_code_int', comment: 'Código do boleto' })
  bom_code: number;
  @Column({ name: 'bom_dueDate_dte', nullable: false, comment: 'Data de vencimento' })
  bom_dueDate: Date;
  @Column({ name: 'bom_checkoutUrl_txt', length: 500 })
  bom_checkoutUrl: string;
  @Column({ name: 'bom_link_txt', length: 500, comment: 'Link para download do PDF' })
  bom_link: string;
  @Column({ name: 'bom_installmentLink_txt', length: 500 })
  bom_installmentLink: string;
  @Column({ name: 'bom_payNumber_txt', length: 500 })
  bom_payNumber: string;
  @Column({ name: 'bom_bankAccount_txt', length: 100 })
  bom_bankAccount: string;
  @Column({ name: 'bom_ourNumber_txt', length: 100 })
  bom_ourNumber: string;
  @Column({ name: 'bom_barcodeNumber_txt', length: 250 })
  bom_barcodeNumber: string;
  @Column({ name: 'bom_portifolio_txt', length: 25 })
  bom_portifolio: string;
  @Column({ name: 'bom_status_pagamento_int' })
  bom_status_pagamento: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Escola, escola => escola.boletosMensalidades, { eager: false })
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;






}