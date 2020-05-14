import { Module } from '@nestjs/common';
import { DiretorService } from './diretor.service';
import { DiretorController } from './diretor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiretorRepository } from './diretor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiretorRepository])],
  providers: [DiretorService],
  controllers: [DiretorController]
})
export class DiretorModule { }
