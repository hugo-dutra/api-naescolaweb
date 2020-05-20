import { ResultadoBoletimRepository } from './resultado-boletim.repository';
import { Module } from '@nestjs/common';
import { ResultadoBoletimService } from './resultado-boletim.service';
import { ResultadoBoletimController } from './resultado-boletim.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadoBoletimRepository])],
  providers: [ResultadoBoletimService],
  controllers: [ResultadoBoletimController]
})
export class ResultadoBoletimModule { }
