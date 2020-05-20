import { Module } from '@nestjs/common';
import { FrequenciaPortariaService } from './frequencia-portaria.service';
import { FrequenciaPortariaController } from './frequencia-portaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrequenciaPortariaRepository } from './frequencia-portaria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FrequenciaPortariaRepository])],
  providers: [FrequenciaPortariaService],
  controllers: [FrequenciaPortariaController]
})
export class FrequenciaPortariaModule { }
