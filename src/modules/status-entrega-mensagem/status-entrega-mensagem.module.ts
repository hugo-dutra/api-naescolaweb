import { StatusEntregaMensagemRepository } from './status-entrega-mensagem.repository';
import { Module } from '@nestjs/common';
import { StatusEntregaMensagemService } from './status-entrega-mensagem.service';
import { StatusEntregaMensagemController } from './status-entrega-mensagem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StatusEntregaMensagemRepository])],
  providers: [StatusEntregaMensagemService],
  controllers: [StatusEntregaMensagemController]
})
export class StatusEntregaMensagemModule { }
