import { OcorrenciaDisciplinar } from './ocorrencia-disciplinar.entity';
import { OcorrenciaDisciplinarService } from './ocorrencia-disciplinar.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('ocorrencia-disciplinar')
export class OcorrenciaDisciplinarController {
  constructor(private ocorrenciaDisciplinarService: OcorrenciaDisciplinarService) { }

  @Post()
  public inserir(@Body() dados: any): Promise<OcorrenciaDisciplinar[]> {
    return this.ocorrenciaDisciplinarService.inserir(dados);
  }

  @Post('/inserir-atraso-da-portaria')
  public inserirAtrasoDaPortaria(@Body() dados: any): Promise<void> {
    return this.ocorrenciaDisciplinarService.inserirAtrasoDaPortaria(dados);
  }

  @Post('/inserir-sem-uniforme-da-portaria')
  public inserirSemUniformeDaPortaria(@Body() dados: any): Promise<void> {
    return this.ocorrenciaDisciplinarService.inserirSemUniformeDaPortaria(dados);
  }

  @Post('/alterar-status-entrega-mensagem')
  public alterarStatusEntregaMensagem(@Body() dados: any[]): Promise<void> {
    return this.ocorrenciaDisciplinarService.alterarStatusEntregaMensagem(dados);
  }

  @Post('/inserir-aplicativo-administrativo')
  public inserirDoAplicativo(@Body() dados: any): Promise<OcorrenciaDisciplinar[]> {
    return this.ocorrenciaDisciplinarService.inserirDoAplicativo(dados);
  }

  @Get('/listar-quantidade-tipo-periodo/:tod_id/:data_inicio/:data_fim/:ordenamento')
  public listarQuantidadeTipoPeriodo(
    @Param('tod_id') tod_id: number, @Param('data_inicio') dataInicio: Date,
    @Param('data_fim') dataFim: Date, @Param('ordenamento') ordenamento: string): Promise<void> {
    return this.ocorrenciaDisciplinarService.listarQuantidadeTipoPeriodo(tod_id, dataInicio, dataFim, ordenamento);
  }

  @Get('/filtrar-ocorrencia/:valor/:limit/:offset/:esc_id')
  public filtrar(
    @Param('valor') valor: string, @Param('limit') limit: number,
    @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.ocorrenciaDisciplinarService.filtrar(valor, limit, offset, esc_id);
  }

  @Get('/listar-quantidade-alerta-nao-verificada/:esc_id/:usr_id/:tod_id/:data_inicio/:data_fim')
  public listarQuantidadeAlertaNaoVerificada(
    @Param('esc_id') esc_id: number, @Param('usr_id') usr_id: number,
    @Param('tod_id') tod_id: number, @Param('data_inicio') data_inicio: Date,
    @Param('data_fim') data_fim: Date,): Promise<any[]> {
    return this.ocorrenciaDisciplinarService.listarQuantidadeAlertaNaoVerificada(esc_id, usr_id, tod_id, data_inicio, data_fim);
  }

  @Get('/listar-detalhes/:est_id/:data_inicio/:data_fim')
  public listarDetalhes(
    @Param('est_id') est_id: number, @Param('data_inicio') dataInicio: Date, @Param('data_fim') dataFim: Date,): Promise<any[]> {
    return this.ocorrenciaDisciplinarService.listarDetalhes(est_id, dataInicio, dataFim);
  }

  @Get('/calcular-avaliacao-social/:trm_id/:data_inicio/:data_fim/:valor_total_avaliacao_social')
  public listarAvaliacaoSocial(
    @Param('trm_id') trm_id: number, @Param('data_inicio') dataInicio: Date, @Param('data_fim') dataFim: Date, @Param('valor_total_avaliacao_social') total: number): Promise<any[]> {
    return this.ocorrenciaDisciplinarService.listarAvaliacaoSocial(trm_id, dataInicio, dataFim, total);
  }

}

