import { PedidoCartao } from './../pedido-cartao/pedido-cartao.entity';
import { Estudante } from './../estudante/estudante.entity';
import { ModeloCartao } from './../modelo-cartao/modelo-cartao.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('cartao_pedido_cap')
export class CartaoPedido extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'cap_id_int' })
  id: number;
  @ManyToOne(type => ModeloCartao, modeloCartao => modeloCartao.cartoesPedidos)
  @JoinColumn({ name: 'moc_id_int' })
  modeloCartao: ModeloCartao;
  @ManyToOne(type => Estudante, estudante => estudante.cartoesPedidos)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => PedidoCartao, pedidoCartao => pedidoCartao.cartoesPedidos)
  @JoinColumn({ name: 'pec_id_int' })
  pedidoCartao: PedidoCartao;
}