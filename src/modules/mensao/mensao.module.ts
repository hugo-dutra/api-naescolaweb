import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MensaoController } from './mensao.controller';
import { MensaoService } from './mensao.service';
import { MensaoRepository } from './mensao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MensaoRepository])],
  controllers: [MensaoController],
  providers: [MensaoService]
})
export class MensaoModule { }
