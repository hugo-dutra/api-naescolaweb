import { Module } from '@nestjs/common';
import { PedidoCartaoService } from './pedido-cartao.service';
import { PedidoCartaoController } from './pedido-cartao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoCartaoRepository } from './pedido-cartao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoCartaoRepository])],
  providers: [PedidoCartaoService],
  controllers: [PedidoCartaoController]
})
export class PedidoCartaoModule { }
