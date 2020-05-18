import { AtividadeExtraClasseRepository } from './atividade-extra-classe.repository';
import { Module } from '@nestjs/common';
import { AtividadeExtraClasseService } from './atividade-extra-classe.service';
import { AtividadeExtraClasseController } from './atividade-extra-classe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AtividadeExtraClasseRepository])],
  providers: [AtividadeExtraClasseService],
  controllers: [AtividadeExtraClasseController]
})
export class AtividadeExtraClasseModule { }
