import { RegraAlertaUsuarioRepository } from './regra-alerta-usuario.repository';
import { Module } from '@nestjs/common';
import { RegraAlertaUsuarioService } from './regra-alerta-usuario.service';
import { RegraAlertaUsuarioController } from './regra-alerta-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegraAlertaUsuarioRepository])],
  providers: [RegraAlertaUsuarioService],
  controllers: [RegraAlertaUsuarioController]
})
export class RegraAlertaUsuarioModule { }
