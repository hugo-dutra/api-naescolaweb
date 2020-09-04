import { Module } from '@nestjs/common';
import { ConceitoController } from './conceito.controller';
import { ConceitoService } from './conceito.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConceitoRepository } from './conceito.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConceitoRepository])],
  controllers: [ConceitoController],
  providers: [ConceitoService]
})
export class ConceitoModule { }
