import { Repository, EntityRepository } from "typeorm";
import { CartaoPedido } from "./cartao-pedido.entity";

@EntityRepository(CartaoPedido)
export class CartaoPedidoRepository extends Repository<CartaoPedido>{ }