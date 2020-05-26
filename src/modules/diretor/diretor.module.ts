
import { DiretorEscolaRepository } from './../diretor-escola/diretor-escola.repository';
import { Module } from '@nestjs/common';
import { DiretorService } from './diretor.service';
import { DiretorController } from './diretor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiretorRepository } from './diretor.repository';
import { EscolaRepository } from '../escola/escola.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiretorRepository, DiretorEscolaRepository, EscolaRepository])],
  providers: [DiretorService],
  controllers: [DiretorController]
})
export class DiretorModule { }
