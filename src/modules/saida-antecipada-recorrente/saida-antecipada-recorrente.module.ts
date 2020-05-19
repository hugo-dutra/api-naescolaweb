import { SaidaAntecipadaRecorrenteRepository } from './saida-antecipada-recorrente.repository';
import { Module } from '@nestjs/common';
import { SaidaAntecipadaRecorrenteService } from './saida-antecipada-recorrente.service';
import { SaidaAntecipadaRecorrenteController } from './saida-antecipada-recorrente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SaidaAntecipadaRecorrenteRepository])],
  providers: [SaidaAntecipadaRecorrenteService],
  controllers: [SaidaAntecipadaRecorrenteController]
})
export class SaidaAntecipadaRecorrenteModule { }
