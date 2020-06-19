import { DiarioAvaliacaoService } from './diario-avaliacao.service';
import { Controller, Body, Post } from '@nestjs/common';

@Controller('diario-avaliacao')
export class DiarioAvaliacaoController {
  constructor(private diarioAvaliacaoService: DiarioAvaliacaoService) { }

  @Post('/avaliacao-diario-registro')
  public inserirDiarioAvaliacao(@Body() dados: any): Promise<void> {
    return this.diarioAvaliacaoService.inserirDiarioAvaliacao(dados);
  }
}
