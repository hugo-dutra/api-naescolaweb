import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurmaRepository } from './turma.repository';
import { TurnoRepository } from '../turno/turno.repository';
import { TurnoService } from '../turno/turno.service';
import { EstudanteTurmaRepository } from '../estudante-turma/estudante-turma.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TurmaRepository, TurnoRepository])],
  providers: [TurmaService, TurnoService],
  controllers: [TurmaController]
})
export class TurmaModule { }
