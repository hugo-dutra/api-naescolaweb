import { DiarioAvaliacaoService } from './diario-avaliacao.service';
import { Controller, Body, Post, Get, Param, Patch } from '@nestjs/common';

@Controller('diario-avaliacao')
export class DiarioAvaliacaoController {
  constructor(private diarioAvaliacaoService: DiarioAvaliacaoService) { }

  @Post('/avaliacao-diario-registro')
  public inserirDiarioAvaliacao(@Body() dados: any): Promise<void> {
    return this.diarioAvaliacaoService.inserirDiarioAvaliacao(dados);
  }

  @Get('/avaliacao-diario-registro/:dip_id')
  public listarDiarioAvaliacao(@Param('dip_id') dip_id: number): Promise<any[]> {
    return this.diarioAvaliacaoService.listarDiarioAvaliacao(dip_id);
  }

  @Patch('/avaliacao-diario-registro')
  public alterarDiarioAvaliacao(@Body() dados: any): Promise<void> {
    return this.diarioAvaliacaoService.alterarDiarioAvaliacao(dados);
  }
}
