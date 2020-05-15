import { Module } from '@nestjs/common';
import { EstudanteTurmaService } from './estudante-turma.service';
import { EstudanteTurmaController } from './estudante-turma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudanteTurmaRepository } from './estudante-turma.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EstudanteTurmaRepository])],
  providers: [EstudanteTurmaService],
  controllers: [EstudanteTurmaController]
})
export class EstudanteTurmaModule { }
