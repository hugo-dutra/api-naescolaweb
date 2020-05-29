
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProfessorDisciplinaService } from './professor-disciplina.service';
import { ProfessorDisciplina } from './professor-disciplina.entity';
import { ProfessorDisciplinaIntegracaoDto } from './dto/professor-disciplina-integracao.dto';
import { DeleteResult } from 'typeorm';
import { Disciplina } from '../disciplina/disciplina.entity';
import { ProfessorDisciplinaEscolaDto } from './dto/professor-disciplina-escola.dto';

@Controller('professor-disciplina')
export class ProfessorDisciplinaController {
  constructor(private professorDisciplinaService: ProfessorDisciplinaService) { }

  @Post()
  public inserir(@Body() professoresEscolas: any): Promise<void> {
    const professores = <number[]>professoresEscolas.professores;
    const disciplinas = <number[]>professoresEscolas.disciplinas;
    return this.professorDisciplinaService.inserir(professores, disciplinas);
  }

  @Post('/integracao')
  public inserirIntegracao(@Body() professoresDisciplinasIntegracaoDto: ProfessorDisciplinaIntegracaoDto[]): Promise<ProfessorDisciplina> {
    return this.professorDisciplinaService.inserirIntegracao(professoresDisciplinasIntegracaoDto);
  }

  @Post('/desvincular')
  public desvincular(@Body() parametros: any): Promise<DeleteResult> {
    return this.professorDisciplinaService.desvincular(parametros);
  }

  @Get('/listar-disciplina/:esc_id/:todos')
  public listarDisciplina(@Param('esc_id') esc_id: number, @Param('todos') todos: boolean): Promise<ProfessorDisciplinaEscolaDto[]> {
    return this.professorDisciplinaService.listarDisciplinas(esc_id, todos)
  }

}
