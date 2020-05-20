import { DiarioAvaliacaoDiagnostica } from './diario-avaliacao-diagnostica.entity';
import { Module } from '@nestjs/common';
import { DiarioAvaliacaoDiagnosticaService } from './diario-avaliacao-diagnostica.service';
import { DiarioAvaliacaoDiagnosticaController } from './diario-avaliacao-diagnostica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DiarioAvaliacaoDiagnostica])],
  providers: [DiarioAvaliacaoDiagnosticaService],
  controllers: [DiarioAvaliacaoDiagnosticaController]
})
export class DiarioAvaliacaoDiagnosticaModule { }
