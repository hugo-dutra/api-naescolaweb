import { ResultadoBoletimRepository } from './../resultado-boletim/resultado-boletim.repository';
import { BoletimEscolaRepository } from './boletim-escolar.repository';
import { Module } from '@nestjs/common';
import { BoletimEscolarService } from './boletim-escolar.service';
import { BoletimEscolarController } from './boletim-escolar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoletimEscolaRepository, ResultadoBoletimRepository])],
  providers: [BoletimEscolarService],
  controllers: [BoletimEscolarController]
})
export class BoletimEscolarModule { }
