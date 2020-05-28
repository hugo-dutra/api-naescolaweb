
import { Controller, Post, Body } from '@nestjs/common';
import { ProfessorDisciplinaService } from './professor-disciplina.service';
import { ProfessorDisciplina } from './professor-disciplina.entity';
import { ProfessorDisciplinaIntegracaoDto } from './dto/professor-disciplina-integracao.dto';

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
  public desvincular(@Body() prf_id: number, dsp_id: number): Promise<void> {
    console.log(prf_id, dsp_id);
    return null;
  }

}
