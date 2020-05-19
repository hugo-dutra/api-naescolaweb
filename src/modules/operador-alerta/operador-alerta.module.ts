import { OperadorAlertaRepository } from './operador-alerta.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OperadorAlertaService } from './operador-alerta.service';
import { OperadorAlertaController } from './operador-alerta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OperadorAlertaRepository])],
  providers: [OperadorAlertaService],
  controllers: [OperadorAlertaController]
})
export class OperadorAlertaModule { }
