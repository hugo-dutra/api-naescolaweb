import { Injectable, ConflictException } from '@nestjs/common';
import { DiretorEscola } from './diretor-escola.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DiretorEscolaRepository } from './diretor-escola.repository';


@Injectable()
export class DiretorEscolaService {
  constructor(@InjectRepository(DiretorEscolaRepository) private diretorEscolaRepository: DiretorEscolaRepository) { }

}

