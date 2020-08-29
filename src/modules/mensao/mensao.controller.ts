import { MensaoService } from './mensao.service';
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import MensaoDto from './dto/mensao.dto';
import { DeleteResult } from 'typeorm';


@Controller('mensao')
export class MensaoController {
  constructor(private mensaoService: MensaoService) { }

  @Post()
  public inserir(@Body() mensaoDto: MensaoDto): Promise<MensaoDto> {
    return this.mensaoService.inserir(mensaoDto);
  }

  @Get('/:esc_id')
  public listarPorEscolaId(@Param('esc_id') escId: number): Promise<MensaoDto[]> {
    return this.mensaoService.listarPorEscolaId(escId);
  }

  @Patch()
  public alterar(@Body() mensaoDto: MensaoDto): Promise<MensaoDto> {
    return this.mensaoService.alterar(mensaoDto);
  }

  @Delete()
  public excluir(@Body() id: number): Promise<DeleteResult> {
    return this.mensaoService.excluir(id);
  }

}
