import { Module } from '@nestjs/common';
import { DiretorEscolaService } from './diretor-escola.service';
import { DiretorEscolaController } from './diretor-escola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiretorEscolaRepository } from './diretor-escola.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiretorEscolaRepository])],
  providers: [DiretorEscolaService],
  controllers: [DiretorEscolaController]
})
export class DiretorEscolaModule { }
