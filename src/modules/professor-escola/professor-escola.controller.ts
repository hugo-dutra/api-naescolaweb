import { ProfessorEscolaService } from './professor-escola.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('professor-escola')
export class ProfessorEscolaController {
  constructor(private professorEscolaService: ProfessorEscolaService) { }

  @Post('/integracao')
  public inserirIntegracao(@Body() dadosProfessorEscola: any[]): Promise<void> {
    return this.professorEscolaService.inserirIntegracao(dadosProfessorEscola);
  }

  @Post('/manual')
  public inserirManual(@Body() dadosProfessorEscola: any[]): Promise<void> {
    return this.professorEscolaService.inserirManual(dadosProfessorEscola);
  }

  @Get('/listar-escola-id/:esc_id/:todos')
  public listarPorEscolaId(@Param('esc_id') esc_id: number, @Param('todos') todos: string): Promise<any[]> {
    return this.professorEscolaService.listarPorEscolaId(esc_id, todos);
  }
}

