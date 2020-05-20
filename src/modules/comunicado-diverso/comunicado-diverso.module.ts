import { ComunicadoDiversoRepository } from './comunicado-diverso.repository';
import { Module } from '@nestjs/common';
import { ComunicadoDiversoService } from './comunicado-diverso.service';
import { ComunicadoDiversoController } from './comunicado-diverso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ComunicadoDiversoRepository])],
  providers: [ComunicadoDiversoService],
  controllers: [ComunicadoDiversoController]
})
export class ComunicadoDiversoModule { }
