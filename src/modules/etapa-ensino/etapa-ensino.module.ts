import { Module } from '@nestjs/common';
import { EtapaEnsinoService } from './etapa-ensino.service';
import { EtapaEnsinoController } from './etapa-ensino.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtapaEnsinoRepository } from './etapa-ensino.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EtapaEnsinoRepository])],
  providers: [EtapaEnsinoService],
  controllers: [EtapaEnsinoController]
})
export class EtapaEnsinoModule { }
