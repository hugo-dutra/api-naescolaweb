import { RegistroDiarioRepository } from './registro-diario.repository';
import { Module } from '@nestjs/common';
import { RegistroDiarioService } from './registro-diario.service';
import { RegistroDiarioController } from './registro-diario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroDiarioRepository])],
  providers: [RegistroDiarioService],
  controllers: [RegistroDiarioController]
})
export class RegistroDiarioModule { }
