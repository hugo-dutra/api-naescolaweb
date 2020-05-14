import { Module } from '@nestjs/common';
import { DiretorEscolaService } from './diretor-escola.service';
import { DiretorEscolaController } from './diretor-escola.controller';

@Module({
  providers: [DiretorEscolaService],
  controllers: [DiretorEscolaController]
})
export class DiretorEscolaModule {}
