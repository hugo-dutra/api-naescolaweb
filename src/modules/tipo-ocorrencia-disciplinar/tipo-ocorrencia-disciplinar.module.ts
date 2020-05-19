import { TipoOcorrenciaDisciplinarRepository } from './tipo-ocorrencia-disciplinar.repository';
import { Module } from '@nestjs/common';
import { TipoOcorrenciaDisciplinarService } from './tipo-ocorrencia-disciplinar.service';
import { TipoOcorrenciaDisciplinarController } from './tipo-ocorrencia-disciplinar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoOcorrenciaDisciplinarRepository])],
  providers: [TipoOcorrenciaDisciplinarService],
  controllers: [TipoOcorrenciaDisciplinarController]
})
export class TipoOcorrenciaDisciplinarModule { }
