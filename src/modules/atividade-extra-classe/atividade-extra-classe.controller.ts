import { AtividadeExtraClasseService } from './atividade-extra-classe.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('atividade-extra-classe')
export class AtividadeExtraClasseController {
  constructor(private atividadeExtraClasseService: AtividadeExtraClasseService) { }

  @Post()
  public inserir(@Body() dados: any): Promise<any> {
    return this.atividadeExtraClasseService.inserir(dados);
  }

  @Get('/:esc_id/:dataInicio/:dataFim')
  public listar(@Param('esc_id') esc_id: number, @Param('dataInicio') dataInicio: Date, @Param('dataFim') dataFim: Date): Promise<any[]> {
    return this.atividadeExtraClasseService.listar(esc_id, dataInicio, dataFim);
  }
}
