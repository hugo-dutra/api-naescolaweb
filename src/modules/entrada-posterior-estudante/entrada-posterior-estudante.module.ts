import { EntradaPosteriorEstudanteRepository } from './entrada-posterior-estudante.repository';
import { Module } from '@nestjs/common';
import { EntradaPosteriorEstudanteService } from './entrada-posterior-estudante.service';
import { EntradaPosteriorEstudanteController } from './entrada-posterior-estudante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EntradaPosteriorEstudanteRepository])],
  providers: [EntradaPosteriorEstudanteService],
  controllers: [EntradaPosteriorEstudanteController]
})
export class EntradaPosteriorEstudanteModule { }
