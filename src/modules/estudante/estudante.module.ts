import { EstudanteReposisoty } from './estudante.repository';
import { Module } from '@nestjs/common';
import { EstudanteService } from './estudante.service';
import { EstudanteController } from './estudante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EstudanteReposisoty])],
  providers: [EstudanteService],
  controllers: [EstudanteController]
})
export class EstudanteModule { }
