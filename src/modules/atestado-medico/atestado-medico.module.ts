import { Module } from '@nestjs/common';
import { AtestadoMedicoService } from './atestado-medico.service';
import { AtestadoMedicoController } from './atestado-medico.controller';

@Module({
  providers: [AtestadoMedicoService],
  controllers: [AtestadoMedicoController]
})
export class AtestadoMedicoModule {}
