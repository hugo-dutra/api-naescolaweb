import { RegiaoEscolaRepository } from './../regiao-escola/regiao-escola.repository';
import { Module } from '@nestjs/common';
import { EscolaService } from './escola.service';
import { EscolaController } from './escola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscolaRepository } from './escola.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EscolaRepository, RegiaoEscolaRepository])],
  providers: [EscolaService],
  controllers: [EscolaController],
  exports: [EscolaService],
})
export class EscolaModule { }
