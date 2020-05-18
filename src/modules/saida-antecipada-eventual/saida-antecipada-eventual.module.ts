import { SaidaAntecipadaEventualRepository } from './saida-antecipada-eventual.repository';
import { Module } from '@nestjs/common';
import { SaidaAntecipadaEventualService } from './saida-antecipada-eventual.service';
import { SaidaAntecipadaEventualController } from './saida-antecipada-eventual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SaidaAntecipadaEventualRepository])],
  providers: [SaidaAntecipadaEventualService],
  controllers: [SaidaAntecipadaEventualController]
})
export class SaidaAntecipadaEventualModule { }
