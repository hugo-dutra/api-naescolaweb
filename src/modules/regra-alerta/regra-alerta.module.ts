import { RegraAlertaRepository } from './regra-alerta.repository';
import { Module } from '@nestjs/common';
import { RegraAlertaService } from './regra-alerta.service';
import { RegraAlertaController } from './regra-alerta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegraAlertaRepository])],
  providers: [RegraAlertaService],
  controllers: [RegraAlertaController]
})
export class RegraAlertaModule { }
