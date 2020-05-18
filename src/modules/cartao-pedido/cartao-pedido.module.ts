import { Module } from '@nestjs/common';
import { CartaoPedidoService } from './cartao-pedido.service';
import { CartaoPedidoController } from './cartao-pedido.controller';

@Module({
  providers: [CartaoPedidoService],
  controllers: [CartaoPedidoController]
})
export class CartaoPedidoModule {}
