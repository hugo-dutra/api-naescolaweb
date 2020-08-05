import { ResultadoBoletimService } from './resultado-boletim.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ResultadoBoletim } from './resultado-boletim.entity';


@Controller('resultado-boletim')
export class ResultadoBoletimController {
  constructor(private resultadoBoletimService: ResultadoBoletimService) { }

  @Post()
  public inserir(@Body() resultadosConsolidados: any[]): Promise<void> {
    return this.resultadoBoletimService.inserir(resultadosConsolidados);
  }

  @Get('/estudantes-destaque/:prl_id/:nota_corte/:esc_id/:quantidade_dsp/:ree_id')
  public listarEstudantesDestaque(
    @Param('prl_id') prl_id: number, @Param('nota_corte') nota_corte: number,
    @Param('esc_id') esc_id: number, @Param('quantidade_dsp') quantidade_dsp: number, @Param('ree_id') ree_id: number): Promise<any[]> {
    return this.resultadoBoletimService.listarEstudantesDestaque(prl_id, nota_corte, esc_id, quantidade_dsp, ree_id);
  }

  @Get('/listar-infrequentes/:esc_id/:trm_id/:minimo_faltas')
  public listarInfrequentes(
    @Param('esc_id') esc_id: number, @Param('trm_id') trm_id: number,
    @Param('minimo_faltas') minimo_faltas: number): Promise<any[]> {
    return this.resultadoBoletimService.listarInfrequentes(esc_id, trm_id, minimo_faltas);
  }

  @Get('/rendimento-turma-periodo/:trm_id/:prl_id')
  public listarRendimentoTurmaPeriodo(@Param('trm_id') trm_id: number, @Param('prl_id') prl_id: number): Promise<any[]> {
    return this.resultadoBoletimService.listarRendimentoTurmaPeriodo(trm_id, prl_id);
  }

  @Get('/rendimento-area-conhecimento-turma-periodo/:trm_id/:prl_id')
  public listarRendimentoAreaConhecimentoTurmaPeriodo(@Param('trm_id') trm_id: number, @Param('prl_id') prl_id: number): Promise<any[]> {
    return this.resultadoBoletimService.listarRendimentoAreaConhecimentoTurmaPeriodo(trm_id, prl_id);
  }

  @Get('/rendimento-faltas-estudante-periodo/:est_id/:prl_id')
  public listarRendimentoFaltasEstudantePeriodo(@Param('est_id') est_id: number, @Param('prl_id') prl_id: number): Promise<any[]> {
    return this.resultadoBoletimService.listarRendimentoFaltasEstudantePeriodo(est_id, prl_id);
  }

  @Get('/aproveitamento-disciplina-turma-periodo/:trm_id/:nota_corte/:prl_id/:tipo_resultado')
  public listarAproveitamentoDisciplinaTurmaPeriodo(
    @Param('trm_id') trm_id: number, @Param('nota_corte') nota_corte: number,
    @Param('prl_id') prl_id: number, @Param('tipo_resultado') tipo_resultado: string): Promise<any[]> {
    return this.resultadoBoletimService.listarAproveitamentoDisciplinaTurmaPeriodo(trm_id, nota_corte, prl_id, tipo_resultado);
  }

  @Get('/aproveitamento-professor-disciplina-periodo/:nota_corte/:prd_id/:prl_id/:tipo_resultado')
  public listarAproveitamentoProfessorDisciplinaPeriodo(
    @Param('nota_corte') nota_corte: number, @Param('prd_id') prd_id: number,
    @Param('prl_id') prl_id: number, @Param('tipo_resultado') tipo_resultado: string): Promise<any[]> {
    return this.resultadoBoletimService.listarAproveitamentoProfessorDisciplinaPeriodo(nota_corte, prd_id, prl_id, tipo_resultado);
  }


}

