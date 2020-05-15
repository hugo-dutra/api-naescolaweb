import { Module } from '@nestjs/common';
import { UsuarioEscolaService } from './usuario-escola.service';
import { UsuarioEscolaController } from './usuario-escola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEscolaRespository } from './usuario-escola.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEscolaRespository])],
  providers: [UsuarioEscolaService],
  controllers: [UsuarioEscolaController]
})
export class UsuarioEscolaModule { }
