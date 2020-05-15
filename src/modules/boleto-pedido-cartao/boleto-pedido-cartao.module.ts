import { BoletoPedidoCartaoRepository } from './boleto-pedido-cartao.repository';
import { Module } from '@nestjs/common';
import { BoletoPedidoCartaoService } from './boleto-pedido-cartao.service';
import { BoletoPedidoCartaoController } from './boleto-pedido-cartao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoletoPedidoCartaoRepository])],
  providers: [BoletoPedidoCartaoService],
  controllers: [BoletoPedidoCartaoController]
})
export class BoletoPedidoCartaoModule { }
