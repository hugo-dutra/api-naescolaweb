import { Module } from '@nestjs/common';
import { CronogramaPortariaService } from './cronograma-portaria.service';
import { CronogramaPortariaController } from './cronograma-portaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronogramaPortariaRepository } from './cronograma-portaria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CronogramaPortariaRepository])],
  providers: [CronogramaPortariaService],
  controllers: [CronogramaPortariaController]
})
export class CronogramaPortariaModule { }
