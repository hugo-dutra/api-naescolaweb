import { ModeloCartaoRepository } from './modelo-cartao.repository';
import { Module } from '@nestjs/common';
import { ModeloCartaoService } from './modelo-cartao.service';
import { ModeloCartaoController } from './modelo-cartao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ModeloCartaoRepository])],
  providers: [ModeloCartaoService],
  controllers: [ModeloCartaoController]
})
export class ModeloCartaoModule { }
