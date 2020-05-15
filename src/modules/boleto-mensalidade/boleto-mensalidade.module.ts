import { BoletoMensalidadeRepository } from './boleto-mensalidade.repository';
import { Module } from '@nestjs/common';
import { BoletoMensalidadeService } from './boleto-mensalidade.service';
import { BoletoMensalidadeController } from './boleto-mensalidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoletoMensalidadeRepository])],
  providers: [BoletoMensalidadeService],
  controllers: [BoletoMensalidadeController]
})
export class BoletoMensalidadeModule { }
