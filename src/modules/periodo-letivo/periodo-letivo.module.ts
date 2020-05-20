import { Module } from '@nestjs/common';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { PeriodoLetivoController } from './periodo-letivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoLetivoRepository } from './periodo-letivo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PeriodoLetivoRepository])],
  providers: [PeriodoLetivoService],
  controllers: [PeriodoLetivoController]
})
export class PeriodoLetivoModule { }
