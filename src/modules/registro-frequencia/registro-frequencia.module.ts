import { RegistroFrequenciaRepository } from './registro-frequencia.repository';
import { Module } from '@nestjs/common';
import { RegistroFrequenciaService } from './registro-frequencia.service';
import { RegistroFrequenciaController } from './registro-frequencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroFrequenciaRepository])],
  providers: [RegistroFrequenciaService],
  controllers: [RegistroFrequenciaController]
})
export class RegistroFrequenciaModule { }
