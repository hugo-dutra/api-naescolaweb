import { FrequenciaPortariaService } from './frequencia-portaria.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';

@Controller('frequencia-portaria')
export class FrequenciaPortariaController {
  constructor(private frequenciaPortariaService: FrequenciaPortariaService) { }

  @Post('/entradas')
  public inserirEntradas(@Body() dados: any): Promise<void> {
    return this.frequenciaPortariaService.inserirEntradas(dados);
  }

  @Post('/saidas')
  public inserirSaidas(@Body() dados: any): Promise<void> {
    return this.frequenciaPortariaService.inserirSaidas(dados);
  }

  @Post('/inserir-do-aplicativo')
  public inserirFrequenciaDoAplicativo(@Body() dados: any): Promise<void> {
    return this.frequenciaPortariaService.inserirFrequenciaDoAplicativo(dados);
  }

  @Get('/presentes-turma-data-movimentacao/:trm_id/:data/:tipo_movimentacao')
  public listarPresentesTurmaDataTipoMovimentacao(
    @Param('trm_id') trm_id: number,
    @Param('data') data: Date,
    @Param('tipo_movimentacao') tipo_movimentacao: number): Promise<any[]> {
    return this.frequenciaPortariaService.listarPresentesTurmaDataTipoMovimentacao(trm_id, data, tipo_movimentacao);
  }

  @Get('/verificar-percentual-turma/:trm_id/:ano_letivo/:tipo_movimentacao')
  public listarVerificarPercentualTurma(
    @Param('trm_id') trm_id: number,
    @Param('ano_letivo') ano_letivo: number,
    @Param('tipo_movimentacao') tipo_movimentacao: number
  ): Promise<any[]> {
    return this.frequenciaPortariaService.listarVerificarPercentualTurma(trm_id, ano_letivo, tipo_movimentacao);
  }


  @Get('/listar-frequencia-periodo/:data_inicio/:data_fim/:tipo_movimentacao/:esc_id')
  public listarFrequenciaPeriodo(
    @Param('data_inicio') data_inicio: Date,
    @Param('data_fim') data_fim: Date,
    @Param('tipo_movimentacao') tipo_movimentacao: number,
    @Param('esc_id') esc_id: number,
  ): Promise<any[]> {
    return this.frequenciaPortariaService.listarFrequenciaPeriodo(data_inicio, data_fim, tipo_movimentacao, esc_id);
  }

  @Get('/historico-entrada-saida/:est_id')
  public listarHistoricoEntradaSaida(
    @Param('est_id') est_id: number
  ): Promise<any[]> {
    return this.frequenciaPortariaService.listarHistoricoEntradaSaida(est_id);
  }

  @Get('/verificar-passagem-recente/:esc_id')
  public listarRegistroMaisRecente(
    @Param('esc_id') esc_id: number
  ): Promise<any[]> {
    return this.frequenciaPortariaService.listarRegistroMaisRecente(esc_id);
  }

  @Get('/absenteismo-total-turma/:trm_id/:esc_id/:data_inicio/:data_fim/:limite')
  public listarAbsenteismoTotalTurma(
    @Param('trm_id') trm_id: number,
    @Param('esc_id') esc_id: number,
    @Param('data_inicio') data_inicio: Date,
    @Param('data_fim') data_fim: Date,
    @Param('limite') limite: number
  ): Promise<any[]> {
    return this.frequenciaPortariaService.listarAbsenteismoTotalTurma(trm_id, esc_id, data_inicio, data_fim, limite);
  }



}
