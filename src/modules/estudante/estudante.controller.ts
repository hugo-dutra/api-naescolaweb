import { EstudanteDto } from './dto/estudante.dto';
import { EstudanteService } from './estudante.service';
import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { EstudanteIntegracaoDto } from './dto/estudante-integracao.dto';
import { EstudanteIntegracaoEnturmarDto } from '../estudante-turma/dto/estudante-integracao-enturmar.dto';
import { Estudante } from './estudante.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('estudante')
export class EstudanteController {
  constructor(private estudanteService: EstudanteService) { }

  @Post()
  public inserir(@Body() estudanteDto: EstudanteDto): Promise<any> {
    return this.estudanteService.inserir(estudanteDto);
  }

  @Post('/via-listagem')
  public inserirViaListagem(@Body() estudantes: any[]): Promise<any> {
    return this.estudanteService.inserirViaListagem(estudantes);
  }

  @Post('/integracao/:esc_id')
  public inserirEstudanteIntegracao(@Body() estudantesIntegracaoDto: EstudanteIntegracaoDto[], @Param('esc_id') esc_id: number): Promise<any> {
    return this.estudanteService.inserirEstudanteIntegracao(estudantesIntegracaoDto, esc_id);
  }

  @Post('alterar-foto-aplicativo-administrativo')
  public alterarFotosAplicativoAdministrativo(@Body() dados: any): Promise<UpdateResult> {
    return this.estudanteService.alterarFotosAplicativoAdministrativo(dados);
  }

  @Get('/turma-id/:trm_id')
  public listarTurmaId(@Param('trm_id') trm_id: number): Promise<any[]> {
    return this.estudanteService.listarTurmaId(trm_id);
  }

  @Get('/listar-local/:limit/:offset/:asc/:esc_id')
  public listarLocal(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.listarLocal(limit, offset, asc, esc_id);
  }

  @Get('/listar-regional/:limit/:offset/:asc/:esc_id')
  public listarRegional(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.listarRegional(limit, offset, asc, esc_id);
  }

  @Get('/listar-global/:limit/:offset/:asc')
  public listarGlobal(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean): Promise<any[]> {
    return this.estudanteService.listarGlobal(limit, offset, asc);
  }

  @Get('/filtrar-local/:valor/:limit/:offset/:esc_id')
  public filtrarLocal(@Param('valor') valor: string, @Param('limit') limit: number, @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.filtrarLocal(valor, limit, offset, esc_id);
  }

  @Get('/filtrar-regional/:valor/:limit/:offset/:esc_id')
  public filtrarRegional(@Param('valor') valor: string, @Param('limit') limit: number, @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.filtrarRegional(valor, limit, offset, esc_id);
  }

  @Get('/filtrar-global/:valor/:limit/:offset')
  public filtrarGlobal(@Param('valor') valor: string, @Param('limit') limit: number, @Param('offset') offset: number): Promise<any[]> {
    return this.estudanteService.filtrarGlobal(valor, limit, offset);
  }

  @Get('/listar-historico-entrega-notificacao/:est_id')
  public listarHistoricoEntregaNotificacao(@Param('est_id') est_id: number): Promise<any[]> {
    return this.estudanteService.listarHistoricoEntregaNotificacao(est_id);
  }

  @Get('/filtrar-conta-ocorrencia/:valor/:limit/:offset/:esc_id')
  public filtrarComOcorrencia(
    @Param('valor') valor: string, @Param('limit') limit: number,
    @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.filtrarComOcorrencia(valor, limit, offset, esc_id);
  }

  @Get('/validar-matricula/:matricula')
  public validarMatricula(@Param('matricula') matricula: string): Promise<any[]> {
    return this.estudanteService.validarMatricula(matricula);
  }

  @Get('/sem-foto/:esc_id')
  public listarSemFoto(@Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.listarSemFoto(esc_id);
  }

  @Get('/turno-id/:trn_id')
  public listarPorTurnoId(@Param('trn_id') trn_id: number): Promise<any[]> {
    return this.estudanteService.listarPorTurnoId(trn_id);
  }

  @Get('/sem-turma/:esc_id')
  public listarSemTurma(@Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.listarSemTurma(esc_id);
  }

  @Get('/listar-aplicativo/:esc_id')
  public listarAplicativo(@Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.listarAplicativo(esc_id);
  }

  @Get('/turma-escola-id/:esc_id')
  public listarPorEscolaId(@Param('esc_id') esc_id: number): Promise<any[]> {
    return this.estudanteService.listarPorEscolaId(esc_id);
  }

  @Patch()
  public alterar(@Body() estudante: Estudante): Promise<Estudante> {
    return this.estudanteService.alterar(estudante);
  }

  @Patch('/alterar-escola')
  public alterarEscola(@Body() dados: any): Promise<void> {
    return this.estudanteService.alterarEscola(dados);
  }

  @Delete()
  public excluir(@Body() est_id: number): Promise<DeleteResult> {
    return this.estudanteService.excluir(est_id);
  }

}
