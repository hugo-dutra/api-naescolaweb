import { SaidaAntecipadaEventualService } from './saida-antecipada-eventual.service';
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';

@Controller('saida-antecipada-eventual')
export class SaidaAntecipadaEventualController {
  constructor(private saidaAntecipadaEventualService: SaidaAntecipadaEventualService) { }

  @Post()
  public inserir(@Body() dados: any): Promise<void> {
    return this.saidaAntecipadaEventualService.inserir(dados);
  }

  @Get('/estudante/:est_id')
  public listarPorEstudanteId(@Param('est_id') est_id: number): Promise<any[]> {
    return this.saidaAntecipadaEventualService.listarPorEstudanteId(est_id);
  }

  @Get('/filtrar/:limite/:offset/:valor/:esc_id')
  public listar(@Param('limite') limite: number, @Param('offset') offset: number, @Param('valor') valor: string, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.saidaAntecipadaEventualService.filtrar(limite, offset, valor, esc_id);
  }

  @Delete()
  public excluir(@Body() sae_id: number): Promise<void> {
    return this.saidaAntecipadaEventualService.excluir(sae_id);
  }
}
