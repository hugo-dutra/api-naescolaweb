import { CronogramaPortariaService } from './cronograma-portaria.service';
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';

@Controller('cronograma-portaria')
export class CronogramaPortariaController {
  constructor(private cronogramaPortariaService: CronogramaPortariaService) { }

  @Post()
  public inserir(@Body() dadosCronogramaPortaria: any): Promise<void> {
    return this.cronogramaPortariaService.inserir(dadosCronogramaPortaria);
  }

  @Get('/:por_id')
  public listar(@Param('por_id') por_id: number): Promise<any[]> {
    return this.cronogramaPortariaService.listar(por_id);
  }

  @Delete()
  public excluir(@Body() crp_id: any): Promise<void> {
    return this.cronogramaPortariaService.excluir(crp_id);
  }

}
