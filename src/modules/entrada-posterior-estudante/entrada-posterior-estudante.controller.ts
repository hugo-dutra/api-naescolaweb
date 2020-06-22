import { EntradaPosteriorEstudanteService } from './entrada-posterior-estudante.service';
import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';

@Controller('entrada-posterior-estudante')
export class EntradaPosteriorEstudanteController {
  constructor(private entradaPosteriorService: EntradaPosteriorEstudanteService) { }

  @Post()
  public inserir(@Body() dados: any[]): Promise<void> {
    return this.entradaPosteriorService.inserir(dados);
  }

  @Get('/:esc_id')
  public listar(@Param('esc_id') esc_id: number): Promise<any[]> {
    return this.entradaPosteriorService.listar(esc_id);
  }

  @Delete()
  public excluir(@Body() pep_id: any): Promise<void> {
    return this.entradaPosteriorService.excluir(pep_id)
  }

}
