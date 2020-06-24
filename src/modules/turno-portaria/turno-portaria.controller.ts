import { Controller, Post, Body, Patch, Get, Param } from '@nestjs/common';
import { TurnoPortariaService } from './turno-portaria.service';

@Controller('turno-portaria')
export class TurnoPortariaController {
  constructor(private turnoPortariaService: TurnoPortariaService) { }

  @Post()
  public inserir(@Body() turnoPortaria: any): Promise<any> {
    return this.turnoPortariaService.inserir(turnoPortaria);
  }

  @Get('/:por_id')
  public listar(@Param('por_id') por_id: number): Promise<any> {
    return this.turnoPortariaService.listar(por_id);
  }

  @Patch()
  public alterar(@Body() turnoPortaria: any[]): Promise<any> {
    return this.turnoPortariaService.alterar(turnoPortaria);
  }

}
