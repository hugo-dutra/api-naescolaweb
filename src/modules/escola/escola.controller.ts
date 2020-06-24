import { EscolaService } from './escola.service';
import { Controller, Body, Post, Param, Get, Patch, Delete } from '@nestjs/common';

@Controller('escola')
export class EscolaController {
  constructor(private escolaService: EscolaService) { }

  @Post()
  public inserir(@Body() escola: any): Promise<any> {
    return this.escolaService.inserir(escola);
  }

  @Get('/local/:limit/:offset/:asc/:esc_id')
  public listarLocal(
    @Param('limit') limit: number, @Param('offset') offset: number,
    @Param('asc') asc: boolean, @Param('esc_id') esc_id: number): Promise<any> {
    return this.escolaService.listarLocal(limit, offset, asc, esc_id);
  }

  @Get('/regional/:limit/:offset/:asc/:esc_id')
  public listarRegional(
    @Param('limit') limit: number, @Param('offset') offset: number,
    @Param('asc') asc: boolean, @Param('esc_id') esc_id: number): Promise<any> {
    return this.escolaService.listarRegional(limit, offset, asc, esc_id);
  }

  @Get('/:limit/:offset/:asc')
  public listarGlobal(
    @Param('limit') limit: number, @Param('offset') offset: number,
    @Param('asc') asc: boolean): Promise<any> {
    return this.escolaService.listarGlobal(limit, offset, asc);
  }

  @Get('/assinatura-gestor/:esc_id')
  public listarAssinaturaGestor(@Param('esc_id') esc_id: number): Promise<any[]> {
    return this.escolaService.listarAssinaturaGestor(esc_id);
  }

  @Get('/filtrar-local/:valor/:limit/:offset/:esc_id')
  public filtrarLocal(
    @Param('valor') valor: string, @Param('limit') limit: number,
    @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.escolaService.filtrarLocal(valor, limit, offset, esc_id);
  }

  @Get('/filtrar-regional/:valor/:limit/:offset/:esc_id')
  public filtrarRegional(
    @Param('valor') valor: string, @Param('limit') limit: number,
    @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.escolaService.filtrarRegional(valor, limit, offset, esc_id);
  }

  @Get('/filtrar/:valor/:limit/:offset')
  public filtrarGlobal(@Param('valor') valor: string, @Param('limit') limit: number, @Param('offset') offset: number): Promise<any[]> {
    return this.escolaService.filtrarGlobal(valor, limit, offset);
  }

  @Get('/listar-dados-boleto-pagamento/:esc_id')
  public listarDadosBoletoPagamento(@Param('esc_id') esc_id: number): Promise<any[]> {
    return this.escolaService.listarDadosBoletoPagamento(esc_id);
  }

  @Get('/sem-diretor')
  public listarSemDiretor(): Promise<any[]> {
    return this.escolaService.listarSemDiretor();
  }

  @Get('/sem-diretor-regional/:esc_id')
  public listarSemDiretorRegional(@Param('esc_id') esc_id: number): Promise<any[]> {
    return this.escolaService.listarSemDiretorRegional(esc_id);
  }

  @Get('/sem-diretor-local/:esc_id')
  public listarSemDiretorLocal(@Param('esc_id') esc_id: number): Promise<any[]> {
    return this.escolaService.listarSemDiretorLocal(esc_id);
  }

  @Patch()
  public alterar(@Body() escola: any): Promise<void> {
    return this.escolaService.alterar(escola);
  }

  @Delete()
  public excluir(@Body() id: any): Promise<void> {
    return this.escolaService.excluir(id);
  }

}
