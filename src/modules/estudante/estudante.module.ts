import { OcorrenciaDisciplinarRespository } from './../ocorrencia-disciplinar/ocorrencia-disciplinar.repository';
import { ComunicadoDiversoRepository } from './../comunicado-diverso/comunicado-diverso.repository';
import { EstudanteTurmaModule } from './../estudante-turma/estudante-turma.module';
import { EscolaModule } from './../escola/escola.module';
import { EstudanteRepository } from './estudante.repository';
import { Module } from '@nestjs/common';
import { EstudanteService } from './estudante.service';
import { EstudanteController } from './estudante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrequenciaPortariaRepository } from '../frequencia-portaria/frequencia-portaria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    EstudanteRepository,
    FrequenciaPortariaRepository,
    ComunicadoDiversoRepository,
    OcorrenciaDisciplinarRespository]), EscolaModule, EstudanteTurmaModule],
  providers: [EstudanteService],
  controllers: [EstudanteController],
  exports: [EstudanteService],
})
export class EstudanteModule { }
