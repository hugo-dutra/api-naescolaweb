import { DisciplinaService } from './disciplina.service';
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { Disciplina } from './disciplina.entity';
import { DeleteResult } from 'typeorm';
import { DisciplinaIntegracaoDto } from './dto/disciplina-integracao.dto';

@Controller('disciplina')
export class DisciplinaController {
  constructor(private disciplinaService: DisciplinaService) { }

  @Post()
  public inserir(@Body() disciplina: Disciplina): Promise<Disciplina> {
    return this.disciplinaService.inserir(disciplina);
  }

  @Post('/integracao')
  public inserirIntegracao(@Body() disciplinasIntegracao: DisciplinaIntegracaoDto[]): Promise<void> {
    return this.disciplinaService.inserirIntegracao(disciplinasIntegracao);
  }

  @Get('/:esc_id')
  public listar(@Param('esc_id') esc_id: number): Promise<Disciplina[]> {
    return this.disciplinaService.listar(esc_id);
  }

  @Get('integracao/:esc_id')
  public listarIntegracao(@Param('esc_id') esc_id: number): Promise<Disciplina[]> {
    return this.disciplinaService.listarIntegracao(esc_id);
  }

  @Patch()
  public alterar(@Body() disciplina: Disciplina): Promise<Disciplina> {
    return this.disciplinaService.alterar(disciplina);
  }

  @Delete()
  public excluir(@Body() id: number): Promise<DeleteResult> {
    return this.disciplinaService.excluir(id);
  }
}
