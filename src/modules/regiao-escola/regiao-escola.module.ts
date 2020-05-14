import { RegiaoEscolaRepository } from './regiao-escola.repository';
import { Module } from '@nestjs/common';
import { RegiaoEscolaService } from './regiao-escola.service';
import { RegiaoEscolaController } from './regiao-escola.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegiaoEscolaRepository])],
  providers: [RegiaoEscolaService],
  controllers: [RegiaoEscolaController]
})
export class RegiaoEscolaModule { }
