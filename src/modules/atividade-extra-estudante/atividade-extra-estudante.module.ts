import { Module } from '@nestjs/common';
import { AtividadeExtraEstudanteService } from './atividade-extra-estudante.service';
import { AtividadeExtraEstudanteController } from './atividade-extra-estudante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtividadeExtraEstudanteRepository } from './atividade-extra-estudante.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AtividadeExtraEstudanteRepository])],
  providers: [AtividadeExtraEstudanteService],
  controllers: [AtividadeExtraEstudanteController]
})
export class AtividadeExtraEstudanteModule { }
