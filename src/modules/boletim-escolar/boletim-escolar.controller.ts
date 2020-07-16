import { BoletimEscolarService } from './boletim-escolar.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('boletim-escolar')
export class BoletimEscolarController {
  constructor(private boletimEscolarService: BoletimEscolarService) { }

  @Post('/gravar-notas-planilha')
  public gravarNotasDePlanilha(@Body() dados: any): Promise<void> {
    return this.boletimEscolarService.gravarNotasDePlanilha(dados);
  }

  @Post('/lancamento-periodo-letivo-manual')
  public lancamentoPeriodoLetivoManual(@Body() dados: any[]): Promise<void> {
    return this.boletimEscolarService.lancamentoPeriodoLetivoManual(dados);
  }

  @Post('/inserir')
  public inserirBoletimEscola(@Body() dados: any[]): Promise<void> {
    return this.boletimEscolarService.inserirBoletinsEscola(dados);
  }

}
