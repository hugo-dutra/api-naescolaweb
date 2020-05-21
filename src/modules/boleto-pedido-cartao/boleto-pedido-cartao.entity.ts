import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { PedidoCartao } from "../pedido-cartao/pedido-cartao.entity";

@Entity('boleto_pedido_cartao_bpc')
export class BoletoPedidoCartao extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'bpc_id_int' })
  id: number;
  @Column({ name: 'bpc_code_int', nullable: false })
  bpc_code: number;
  @Column({ name: 'bpc_dueDate_dte' })
  bpc_dueDate: Date;
  @Column({ name: 'bpc_checkoutUrl_txt', length: 500 })
  bpc_checkoutUrl: string;
  @Column({ name: 'bpc_link_txt', length: 500 })
  bpc_link: string;
  @Column({ name: 'bpc_installmentLink_txt', length: 500 })
  bpc_installmentLink: string;
  @Column({ name: 'bpc_payNumber_txt', length: 100 })
  bpc_payNumber: string;
  @Column({ name: 'bpc_bankAccount_txt', length: 100 })
  bpc_bankAccount: string;
  @Column({ name: 'bpc_ourNumber_txt', length: 100 })
  bpc_ourNumber: string;
  @Column({ name: 'bpc_barcodeNumber_txt', length: 250 })
  bpc_barcodeNumber: string;
  @Column({ name: 'bpc_portifolio_txt', length: 250 })
  bpc_portifolio: string;
  @Column({ name: 'bpc_status_pagamento_int' })
  bpc_status_pagamento: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => PedidoCartao, pedidoCartao => pedidoCartao.boletosPedidosCartoes)
  @JoinColumn({ name: 'pec_id_int' })
  pedidoCartao: PedidoCartao;

}