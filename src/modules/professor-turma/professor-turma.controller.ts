import { ProfessorTurmaService } from './professor-turma.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProfessorTurmaDisciplinaDto } from './dto/professor-turma-disciplina.dto';

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

  @Get('/listar-professor-disciplina-id/:prd_id/:esc_id')
  public listarProfessorDisciplina(@Param('prd_id') prd_id: number, @Param('esc_id') esc_id: number): Promise<ProfessorTurmaDisciplinaDto[]> {
    return this.professorTurmaService.listarProfessorDisciplina(prd_id, esc_id);
  }

}

