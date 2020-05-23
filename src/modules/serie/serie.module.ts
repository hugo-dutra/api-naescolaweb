import { EtapaEnsinoService } from './../etapa-ensino/etapa-ensino.service';
import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerieRepository } from './serie.repository';
import { EtapaEnsinoRepository } from '../etapa-ensino/etapa-ensino.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SerieRepository, EtapaEnsinoRepository])],
  providers: [SerieService, EtapaEnsinoService],
  controllers: [SerieController]
})
export class SerieModule { }
