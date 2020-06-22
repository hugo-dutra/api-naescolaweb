import { AvaliacaoEstudanteService } from './avaliacao-estudante.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('avaliacao-estudante')
export class AvaliacaoEstudanteController {
  constructor(private avaliacaoEstudanteService: AvaliacaoEstudanteService) { }

  @Get('/diario-registro/:dav_id')
  public listarPorDiarioAvaliacaoId(@Param('dav_id') dav_id: number): Promise<any[]> {
    return this.avaliacaoEstudanteService.listarPorDiarioAvaliacaoId(dav_id);
  }

}
