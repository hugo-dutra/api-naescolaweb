import { Module } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplinaRepository } from './disciplina.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DisciplinaRepository])],
  providers: [DisciplinaService],
  controllers: [DisciplinaController]
})
export class DisciplinaModule { }
