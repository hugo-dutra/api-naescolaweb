import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MencaoController } from './mencao.controller';
import { MensaoService } from './mencao.service';
import { MencaoRepository } from './mencao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MencaoRepository])],
  controllers: [MencaoController],
  providers: [MensaoService]
})
export class MensaoModule { }
