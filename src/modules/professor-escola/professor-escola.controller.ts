import { ProfessorEscolaService } from './professor-escola.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('professor-escola')
export class ProfessorEscolaController {
  constructor(private professorEscolaService: ProfessorEscolaService) { }

  @Post()
  public inserir(@Body() dadosProfessorEscola: any[]): Promise<void> {
    return this.professorEscolaService.inserirIntegracao(dadosProfessorEscola);
  }
}

