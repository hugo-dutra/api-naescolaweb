import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { RedeEnsinoModule } from './modules/rede-ensino/rede-ensino.module';
import { RegiaoEscolaModule } from './modules/regiao-escola/regiao-escola.module';
import { EscolaModule } from './modules/escola/escola.module';
import { DiretorModule } from './modules/diretor/diretor.module';
import { DiretorEscolaModule } from './modules/diretor-escola/diretor-escola.module';
import { TurnoModule } from './modules/turno/turno.module';
import { EtapaEnsinoModule } from './modules/etapa-ensino/etapa-ensino.module';
import { SerieModule } from './modules/serie/serie.module';
import { TurmaModule } from './modules/turma/turma.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RedeEnsinoModule,
    RegiaoEscolaModule,
    EscolaModule,
    DiretorModule,
    DiretorEscolaModule,
    TurnoModule,
    EtapaEnsinoModule,
    SerieModule,
    TurmaModule,
  ],
})
export class AppModule { }
