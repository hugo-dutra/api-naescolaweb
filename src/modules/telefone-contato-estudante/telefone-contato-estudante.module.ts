import { Module } from '@nestjs/common';
import { TelefoneContatoEstudanteService } from './telefone-contato-estudante.service';
import { TelefoneContatoEstudanteController } from './telefone-contato-estudante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelefoneContatoEstudanteRepository } from './telefone-contato-estudante.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TelefoneContatoEstudanteRepository])],
  providers: [TelefoneContatoEstudanteService],
  controllers: [TelefoneContatoEstudanteController]
})
export class TelefoneContatoEstudanteModule { }
