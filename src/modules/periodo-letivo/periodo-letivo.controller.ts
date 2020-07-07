import { PeriodoLetivoService } from './periodo-letivo.service';
import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';

@Controller('periodo-letivo')
export class PeriodoLetivoController {
  constructor(private periodoLetivoService: PeriodoLetivoService) { }

  @Post()
  public inserir(@Body() periodoLetivo: any): Promise<void> {
    return this.periodoLetivoService.inserir(periodoLetivo);
  }

  @Get()
  public listar(): Promise<any[]> {
    return this.periodoLetivoService.listar();
  }

  @Get('/prl_id/:prl_id')
  public listarPorId(@Param('prl_id') prl_id: number): Promise<any[]> {
    return this.periodoLetivoService.listarPorId(prl_id);
  }

  @Get('/ano/:ano')
  public listarPorAno(@Param('ano') ano: number): Promise<any[]> {
    return this.periodoLetivoService.listarPorAno(ano);
  }

  @Patch()
  public alterar(@Body() periodoLetivo: any): Promise<void> {
    return this.periodoLetivoService.alterar(periodoLetivo);
  }

  @Delete()
  public excluir(@Body() id: any): Promise<void> {
    return this.periodoLetivoService.excluir(id);
  }

}
