import { ProfessorTurmaService } from './professor-turma.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('professor-turma')
export class ProfessorTurmaController {
  constructor(private professorTurmaService: ProfessorTurmaService) { }

  @Post()
  public inserir(@Body() professoresTurmas: any): Promise<void> {
    return this.professorTurmaService.inserir(professoresTurmas);
  }

  @Post('/integracao')
  public inserirIntegracao(@Body() professoresTurmas: any): Promise<void> {
    return this.professorTurmaService.inserirIntegracao(professoresTurmas);
  }

}

