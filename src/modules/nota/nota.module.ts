import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NotaController } from './nota.controller';
import { NotaService } from './nota.service';
import { NotaRepository } from './nota.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NotaRepository])],
  controllers: [NotaController],
  providers: [NotaService]
})
export class NotaModule { }
