import { EstudanteDto } from './dto/estudante.dto';
import { EstudanteService } from './estudante.service';
import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { EstudanteIntegracaoDto } from './dto/estudante-integracao.dto';
import { EstudanteIntegracaoEnturmarDto } from '../estudante-turma/dto/estudante-integracao-enturmar.dto';
import { Estudante } from './estudante.entity';
import { DeleteResult } from 'typeorm';

@Controller('estudante')
export class EstudanteController {
  constructor(private estudanteService: EstudanteService) { }

  @Post()
  public inserir(@Body() estudanteDto: EstudanteDto): Promise<any> {
    return this.estudanteService.inserir(estudanteDto);
  }

  @Post('/integracao/:esc_id')
  public inserirEstudanteIntegracao(@Body() estudantesIntegracaoDto: EstudanteIntegracaoDto[], @Param('esc_id') esc_id: number): Promise<any> {
    return this.estudanteService.inserirEstudanteIntegracao(estudantesIntegracaoDto, esc_id);
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
