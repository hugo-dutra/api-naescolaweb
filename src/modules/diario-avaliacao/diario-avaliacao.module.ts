import { Module } from '@nestjs/common';
import { DiarioAvaliacaoService } from './diario-avaliacao.service';
import { DiarioAvaliacaoController } from './diario-avaliacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiarioAvaliacaoRepository } from './diario-avaliacao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiarioAvaliacaoRepository])],
  providers: [DiarioAvaliacaoService],
  controllers: [DiarioAvaliacaoController]
})
export class DiarioAvaliacaoModule { }
