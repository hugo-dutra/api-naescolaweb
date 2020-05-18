import { TurnoPortariaRepository } from './turno-portaria.repository';
import { Module } from '@nestjs/common';
import { TurnoPortariaService } from './turno-portaria.service';
import { TurnoPortariaController } from './turno-portaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TurnoPortariaRepository])],
  providers: [TurnoPortariaService],
  controllers: [TurnoPortariaController]
})
export class TurnoPortariaModule { }
