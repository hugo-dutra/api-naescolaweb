import { AvaliacaoEstudanteService } from './avaliacao-estudante.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('avaliacao-estudante')
export class AvaliacaoEstudanteController {
  constructor(private avaliacaoEstudanteService: AvaliacaoEstudanteService) { }

  @Get('/diario-registro/:dav_id')
  public listarPorDiarioAvaliacaoId(@Param('dav_id') dav_id: number): Promise<any[]> {
    return this.avaliacaoEstudanteService.listarPorDiarioAvaliacaoId(dav_id);
  }

  @Get('/consolidar-notas/:media_somatorio/:prl_id/:dip_id')
  public consolidarNotasParaBoletimEscolar(
    @Param('media_somatorio') media_somatorio: number,
    @Param('prl_id') prl_id: number,
    @Param('dip_id') dip_id: number): Promise<any[]> {
    return this.avaliacaoEstudanteService.consolidarNotasParaBoletimEscolar(media_somatorio, prl_id, dip_id);
  }

}
