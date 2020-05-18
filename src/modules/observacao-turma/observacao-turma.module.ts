import { Module } from '@nestjs/common';
import { ObservacaoTurmaService } from './observacao-turma.service';
import { ObservacaoTurmaController } from './observacao-turma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservacaoTurmaRepository } from './observacao-turma.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ObservacaoTurmaRepository])],
  providers: [ObservacaoTurmaService],
  controllers: [ObservacaoTurmaController]
})
export class ObservacaoTurmaModule { }
