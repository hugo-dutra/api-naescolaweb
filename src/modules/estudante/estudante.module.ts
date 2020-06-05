import { EstudanteTurmaModule } from './../estudante-turma/estudante-turma.module';
import { EscolaModule } from './../escola/escola.module';
import { EstudanteRepository } from './estudante.repository';
import { Module } from '@nestjs/common';
import { EstudanteService } from './estudante.service';
import { EstudanteController } from './estudante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EstudanteRepository]), EscolaModule, EstudanteTurmaModule],
  providers: [EstudanteService],
  controllers: [EstudanteController],
  exports: [EstudanteService],
})
export class EstudanteModule { }
