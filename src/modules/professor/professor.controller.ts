import { DeleteResult } from 'typeorm';
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { Professor } from './professor.entity';
import { ProfessorIntegracaoDto } from './dto/professor-integracao.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private professorService: ProfessorService) { }

  @Post()
  public inserir(@Body() professor: Professor): Promise<Professor> {
    return this.professorService.inserir(professor);
  }

  @Post('/integracao-inserir')
  public inserirIntegracao(@Body() professoresIntegracao: ProfessorIntegracaoDto[]): Promise<void> {
    return this.professorService.inserirIntegracao(professoresIntegracao);
  }


  @Get('/:limit/:offset/:asc/:usr_id/:esc_id')
  public listar(
    @Param('limit') limit: number, @Param('offset') offset: number,
    @Param('asc') asc: boolean, @Param('usr_id') usr_id: number,
    @Param('esc_id') esc_id: number): Promise<Professor[]> {
    return this.professorService.listar(limit, offset, asc, usr_id, esc_id);
  }

  @Get('/disciplinas/:prf_id')
  public listarDisciplinas(
    @Param('prf_id') prf_id: number): Promise<Professor[]> {
    return this.professorService.listarDisciplinas(prf_id);
  }

  @Patch()
  public alterar(@Body() professor: Professor): Promise<Professor> {
    return this.professorService.alterar(professor);
  }

  @Delete()
  public excluir(@Body() prf_id: any): Promise<DeleteResult> {
    return this.professorService.excluir(prf_id.id);
  }

}

