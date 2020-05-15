import { Repository, EntityRepository } from "typeorm";
import { BoletoPedidoCartao } from "./boleto-pedido-cartao.entity";

@EntityRepository(BoletoPedidoCartao)
export class BoletoPedidoCartaoRepository extends Repository<BoletoPedidoCartao>{ }