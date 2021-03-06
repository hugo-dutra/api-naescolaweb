import { CartaoPedido } from './../cartao-pedido/cartao-pedido.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('modelo_cartao_moc')
export class ModeloCartao extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'moc_id_int' })
  id: number;
  @Column({ name: 'moc_nome_txt', nullable: false, length: 45 })
  moc_nome: string;
  @Column({ name: 'moc_valor_num', nullable: false, default: 0 })
  moc_valor: number;
  @OneToMany(type => CartaoPedido, cartaoPedido => cartaoPedido.modeloCartao)
  cartoesPedidos: CartaoPedido[];

}