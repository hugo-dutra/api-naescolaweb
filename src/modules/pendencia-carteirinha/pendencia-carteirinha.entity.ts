import { PedidoCartao } from './../pedido-cartao/pedido-cartao.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity('pendencia_carteirinha_pen')
export class PendenciaCarteirinha extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'pen_id_int' })
  id: number;
  @Column({ name: 'pen_descricao_txt', length: 1000 })
  pen_descricao: string;
  @Column({ name: 'pen_data_dte', nullable: false })
  pen_data: Date;
  @Column({ name: 'pen_status_int', nullable: false, default: 0 })
  pen_status: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Estudante, estudante => estudante.pendenciasCarteirinhas, { eager: false })
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => Usuario, usuario => usuario.pendenciasCarteirinhas, { eager: false })
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => PedidoCartao, pedidoCartao => pedidoCartao.pendenciasCarteirinhas, { eager: false })
  @JoinColumn({ name: 'pec_id_int' })
  pedidoCartao: PedidoCartao;


}