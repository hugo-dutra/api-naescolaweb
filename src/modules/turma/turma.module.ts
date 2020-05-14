import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurmaRepository } from './turma.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TurmaRepository])],
  providers: [TurmaService],
  controllers: [TurmaController]
})
export class TurmaModule { }
