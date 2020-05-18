import { AtividadeExtraClasseRepository } from './../atividade-extra-classe/atividade-extra-classe.repository';
import { Module } from '@nestjs/common';
import { AtividadeExtraEstudanteService } from './atividade-extra-estudante.service';
import { AtividadeExtraEstudanteController } from './atividade-extra-estudante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AtividadeExtraClasseRepository])],
  providers: [AtividadeExtraEstudanteService],
  controllers: [AtividadeExtraEstudanteController]
})
export class AtividadeExtraEstudanteModule { }
