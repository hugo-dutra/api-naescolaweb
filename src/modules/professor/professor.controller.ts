import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { Professor } from './professor.entity';

@Controller('professor')
export class ProfessorController {
  constructor(private professorService: ProfessorService) { }

  @Post()
  public inserir(@Body() professor: Professor): Promise<Professor> {
    return this.professorService.inserir(professor);
  }


  @Get('/:limit/:offset/:asc/:usr_id/:esc_id')
  public listar(
    @Param('limit') limit: number, @Param('offset') offset: number,
    @Param('asc') asc: boolean, @Param('usr_id') usr_id: number,
    @Param('esc_id') esc_id: number): Promise<Professor[]> {
    return this.professorService.listar(limit, offset, asc, usr_id, esc_id);
  }

}

