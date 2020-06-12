import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AtestadoMedicoService } from './atestado-medico.service';
import { AtestadoMedicoController } from './atestado-medico.controller';
import { AtestadoMedicoRepository } from './atestado-medico.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AtestadoMedicoRepository])],
  providers: [AtestadoMedicoService],
  controllers: [AtestadoMedicoController]
})
export class AtestadoMedicoModule { }
