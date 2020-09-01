import { TipoMedidaAvaliacaoRepository } from './tipo-medida-avaliacao.repository';
import { Module } from '@nestjs/common';
import { TipoMedidaAvaliacaoController } from './tipo-medida-avaliacao.controller';
import { TipoMedidaAvaliacaoService } from './tipo-medida-avaliacao.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoMedidaAvaliacaoRepository])],
  controllers: [TipoMedidaAvaliacaoController],
  providers: [TipoMedidaAvaliacaoService]
})
export class TipoMedidaAvaliacaoModule { }
