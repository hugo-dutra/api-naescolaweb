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


}

