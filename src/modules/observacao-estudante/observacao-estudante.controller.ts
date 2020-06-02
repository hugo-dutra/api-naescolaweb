import { ObservacaoEstudanteService } from './observacao-estudante.service';
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ObservacaoEstudanteDto } from './dto/observacao-estudante.dto';
import { DeleteResult } from 'typeorm';

@Controller('observacao-estudante')
export class ObservacaoEstudanteController {
  constructor(private observacaoEstudanteService: ObservacaoEstudanteService) { }

  @Post()
  public inserir(@Body() observacaoEstudanteDto: ObservacaoEstudanteDto): Promise<ObservacaoEstudanteDto> {
    return this.observacaoEstudanteService.inserir(observacaoEstudanteDto);
  }

  @Get('/:est_id')
  public listar(@Param('est_id') est_id: number): Promise<any[]> {
    return this.observacaoEstudanteService.listar(est_id);
  }

  @Patch()
  public alterar(@Body() observacaoEstudanteDto: ObservacaoEstudanteDto): Promise<ObservacaoEstudanteDto> {
    return this.observacaoEstudanteService.alterar(observacaoEstudanteDto);
  }

  @Delete()
  public excluir(@Body() id: number): Promise<DeleteResult> {
    return this.observacaoEstudanteService.excluir(id);
  }
}

