import { Controller, Post, Body, Patch, Delete, Param, Get } from '@nestjs/common';
import ConceitoDto from './dto/conceito.dto';
import { DeleteResult } from 'typeorm';
import { ConceitoService } from './conceito.service';

@Controller('conceito')
export class ConceitoController {
  constructor(private conceitoService: ConceitoService) { }

  @Post()
  public inserir(@Body() conceitoDto: ConceitoDto): Promise<ConceitoDto> {
    return this.conceitoService.inserir(conceitoDto);
  }

  @Get('/:esc_id')
  public listarPorEscolaId(@Param('esc_id') escId: number): Promise<ConceitoDto[]> {
    return this.conceitoService.listarPorEscolaId(escId);
  }

  @Patch()
  public alterar(@Body() conceitoDto: ConceitoDto): Promise<ConceitoDto> {
    return this.conceitoService.alterar(conceitoDto);
  }

  @Delete()
  public excluir(@Body() id: number): Promise<DeleteResult> {
    return this.conceitoService.excluir(id);
  }

}
