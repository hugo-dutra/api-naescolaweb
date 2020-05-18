import { ObservacaoEstudanteRepository } from './observacao-estudante.repository';
import { Module } from '@nestjs/common';
import { ObservacaoEstudanteService } from './observacao-estudante.service';
import { ObservacaoEstudanteController } from './observacao-estudante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ObservacaoEstudanteRepository])],
  providers: [ObservacaoEstudanteService],
  controllers: [ObservacaoEstudanteController]
})
export class ObservacaoEstudanteModule { }
