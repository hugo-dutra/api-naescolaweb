import { Module } from '@nestjs/common';
import { AreaConhecimentoService } from './area-conhecimento.service';
import { AreaConhecimentoController } from './area-conhecimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaConhecimentoRepository } from './area-conhecimento.repositoty';

@Module({
  imports: [TypeOrmModule.forFeature([AreaConhecimentoRepository])],
  providers: [AreaConhecimentoService],
  controllers: [AreaConhecimentoController]
})
export class AreaConhecimentoModule { }
