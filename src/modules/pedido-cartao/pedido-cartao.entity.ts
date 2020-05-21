import { PendenciaCarteirinha } from './../pendencia-carteirinha/pendencia-carteirinha.entity';
import { CartaoPedido } from './../cartao-pedido/cartao-pedido.entity';
import { ModeloCartao } from './../modelo-cartao/modelo-cartao.entity';
import { BoletoPedidoCartao } from './../boleto-pedido-cartao/boleto-pedido-cartao.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, Column, JoinColumn, ManyToOne } from "typeorm";
import { Usuario } from '../usuario/usuario.entity';
import { Escola } from '../escola/escola.entity';

@Entity('pedido_cartao_pec')
export class PedidoCartao extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'pec_id_int' })
  id: number;
  @Column({ name: 'pec_data_dte', nullable: false })
  pec_data: Date;
  @Column({ name: 'pec_status_int', default: 0 })
  pec_status: number;
  @Column({ name: 'pec_data_conclusao_dte' })
  pec_data_conclusao: Date;
  @Column({ name: 'pec_valor_total_num' })
  pec_valor_total: number;
  @Column({ name: 'pec_quantidade_cartao_int' })
  pec_quantidade_cartao: number;
  /* RELACIONAMENTOS */
  @OneToMany(type => BoletoPedidoCartao, boletoPedidoCartao => boletoPedidoCartao.pedidoCartao)
  boletosPedidosCartoes: BoletoPedidoCartao[];
  @ManyToOne(type => Usuario, usuario => usuario.pedidosCartoes)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Escola, escola => escola => escola.pedidosCartoes)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => CartaoPedido, cartaoPedido => cartaoPedido.pedidoCartao)
  cartoesPedidos: CartaoPedido[];
  @OneToMany(type => PendenciaCarteirinha, pendenciaCarteirinha => pendenciaCarteirinha.pedidoCartao)
  pendenciasCarteirinhas: PendenciaCarteirinha[];



}