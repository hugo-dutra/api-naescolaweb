import { AtividadeExtraEstudanteService } from './atividade-extra-estudante.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AtividadeExtraExtudanteDto } from './dto/atividade-extra-estudante.dto';

@Controller('atividade-extra-estudante')
export class AtividadeExtraEstudanteController {
  constructor(private atividadeExtraEstudanteService: AtividadeExtraEstudanteService) { }

  @Post()
  public inserir(@Body() dados: AtividadeExtraExtudanteDto[]): Promise<any> {
    return this.atividadeExtraEstudanteService.inserir(dados);
  }

  @Get('/:aec_id')
  public listar(@Param('aec_id') aec_id: number): Promise<any[]> {
    return this.atividadeExtraEstudanteService.listar(aec_id);
  }

}
