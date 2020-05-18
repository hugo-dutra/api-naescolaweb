import { SugestaoUsuarioRepository } from './sugestao-usuario.repository';
import { Module } from '@nestjs/common';
import { SusgestaoUsuarioService } from './susgestao-usuario.service';
import { SusgestaoUsuarioController } from './susgestao-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SugestaoUsuarioRepository])],
  providers: [SusgestaoUsuarioService],
  controllers: [SusgestaoUsuarioController]
})
export class SusgestaoUsuarioModule { }
