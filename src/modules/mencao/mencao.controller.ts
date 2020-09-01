import { MensaoService } from './mencao.service';
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import MencaoDto from './dto/mencao.dto';
import { DeleteResult } from 'typeorm';


@Controller('mencao')
export class MencaoController {
  constructor(private mensaoService: MensaoService) { }

  @Post()
  public inserir(@Body() mensaoDto: MencaoDto): Promise<MencaoDto> {
    return this.mensaoService.inserir(mensaoDto);
  }

  @Get('/:esc_id')
  public listarPorEscolaId(@Param('esc_id') escId: number): Promise<MencaoDto[]> {
    return this.mensaoService.listarPorEscolaId(escId);
  }

  @Patch()
  public alterar(@Body() mensaoDto: MencaoDto): Promise<MencaoDto> {
    return this.mensaoService.alterar(mensaoDto);
  }

  @Delete()
  public excluir(@Body() id: number): Promise<DeleteResult> {
    return this.mensaoService.excluir(id);
  }

}
