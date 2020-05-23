import { TurmaFiltroDto } from './dto/turma-filtro.dto';
import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaPorEscolaDto } from './dto/turma-escola.dto';
import { Turma } from './turma.entity';

@Controller('turma')
export class TurmaController {
  constructor(private turmaService: TurmaService) { }

  @Post()
  public async inserirTurma(@Body() turmas: Turma[]): Promise<Turma[]> {
    const teste = await this.turmaService.inserirTurma(turmas);
    console.log(teste)
    return teste;
  }

  @Get('/:limit/:offset/:asc/:esc_id')
  public listarTurmasPorEscola(
    @Param('limit') limit: number,
    @Param('offset') offset: number,
    @Param('asc') asc: boolean,
    @Param('esc_id') esc_id: number, ): Promise<TurmaPorEscolaDto[]> {
    return this.turmaService.listarTurmasPorEscola(limit, offset, asc, esc_id);
  }

}
