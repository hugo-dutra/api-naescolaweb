import { PedidoCartao } from './pedido-cartao.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(PedidoCartao)
export class PedidoCartaoRepository extends Repository<PedidoCartao>{ }