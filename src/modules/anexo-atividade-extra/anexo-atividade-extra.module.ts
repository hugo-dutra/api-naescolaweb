import { Module } from '@nestjs/common';
import { AnexoAtividadeExtraService } from './anexo-atividade-extra.service';
import { AnexoAtividadeExtraController } from './anexo-atividade-extra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnexoAtividadeExtraRepository } from './anexo-atividade-extra.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnexoAtividadeExtraRepository])],
  providers: [AnexoAtividadeExtraService],
  controllers: [AnexoAtividadeExtraController]
})
export class AnexoAtividadeExtraModule { }
