import { TurmaIntegracaoNomeDto } from './dto/turma-integracao-nomes.dto';
import { DeleteResult } from 'typeorm';
import { TurmaFiltroDto } from './dto/turma-filtro.dto';
import { Controller, Get, Body, Param, Post, Patch, Delete } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaPorEscolaDto } from './dto/turma-escola.dto';
import { Turma } from './turma.entity';
import { TurmaIntegracaoDto } from './dto/turma-integracao.dto';

@Controller('turma')
export class TurmaController {
  constructor(private turmaService: TurmaService) { }

  @Post()
  public async inserirTurma(@Body() turmas: Turma[]): Promise<Turma[]> {
    return this.turmaService.inserirTurma(turmas);
  }

  @Post('/integracao')
  public async inserirTurmaIntegracao(@Body() dadosTurmasIntegracal: TurmaIntegracaoDto[]): Promise<Turma[]> {
    const turmas: TurmaIntegracaoDto[] = dadosTurmasIntegracal['turmas'];
    const esc_id = dadosTurmasIntegracal['esc_id'];
    const ano = dadosTurmasIntegracal['ano'];
    const turmasMapeadas: TurmaIntegracaoNomeDto[] = turmas.map((turmaIntegracaoDto: TurmaIntegracaoDto) => {
      const turmaMapeada = new TurmaIntegracaoNomeDto();
      turmaMapeada.ano = ano;
      turmaMapeada.esc_id = esc_id;
      turmaMapeada.id = turmaIntegracaoDto.id;
      turmaMapeada.nome = turmaIntegracaoDto.nm_turma;
      turmaMapeada.sre_id = turmaIntegracaoDto.cod_serie;
      turmaMapeada.sre_nome = turmaIntegracaoDto.nm_serie;
      turmaMapeada.trn_id = 0
      turmaMapeada.trn_nome = turmaIntegracaoDto.nm_turno;
      return turmaMapeada;
    })
    return this.turmaService.inserirTurmaIntegracao(turmasMapeadas);
  }

  @Get('/:limit/:offset/:asc/:esc_id')
  public listarTurmasPorEscola(
    @Param('limit') limit: number,
    @Param('offset') offset: number,
    @Param('asc') asc: boolean,
    @Param('esc_id') esc_id: number, ): Promise<TurmaPorEscolaDto[]> {
    return this.turmaService.listarTurmasPorEscola(limit, offset, asc, esc_id);
  }

  @Get('/filtrar/:valor/:limit/:offset/:esc_id')
  public filtrarTurmasPorNomeEscola(
    @Param('valor') valor: string,
    @Param('limit') limit: number,
    @Param('offset') offset: number,
    @Param('esc_id') esc_id: number, ): Promise<TurmaPorEscolaDto[]> {
    return this.turmaService.filtrarTurmasPorNomeEscola(valor, limit, offset, esc_id);
  }

  @Get('/todas')
  public listarTodasTurmas(): Promise<TurmaPorEscolaDto[]> {
    return this.turmaService.listarTodasTurmas();
  }

  // Precisa de estudantes enturmados e cadastrados para ser testado
  /* @Get('/:trn_id/:esc_id/:ano')
  public listarTurmasPorTurno(
    @Param('trn_id') trn_id: number,
    @Param('esc_id') esc_id: number,
    @Param('ano') ano: number, ): Promise<Turma[]> {
    return this.turmaService.listarTurmasPorTurno(trn_id, esc_id, ano);
  } */

  @Patch()
  public alterarTurma(@Body() turma: Turma): Promise<Turma> {
    return this.turmaService.alterarTurma(turma);
  }

  @Delete()
  public excluirTurma(@Body() turma: Turma): Promise<DeleteResult> {
    return this.turmaService.excluirTurma(turma.id);
  }

}
