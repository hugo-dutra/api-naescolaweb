import { TipoOcorrenciaDisciplinarService } from './tipo-ocorrencia-disciplinar.service';
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TipoOcorrenciaDisciplinarDto } from './dto/tipo-ocorrencia-disciplinar.dto';
import { TipoOcorrenciaDisciplinar } from './tipo-ocorrencia-disciplinar.entity';
import { DeleteResult } from 'typeorm';

@Controller('tipo-ocorrencia-disciplinar')
export class TipoOcorrenciaDisciplinarController {
  constructor(private tipoOcorrenciaDisciplinarService: TipoOcorrenciaDisciplinarService) { }

  @Post()
  public inserir(@Body() tipoOcorrenciaDisciplinarDto: TipoOcorrenciaDisciplinarDto): Promise<TipoOcorrenciaDisciplinar> {
    return this.tipoOcorrenciaDisciplinarService.inserir(tipoOcorrenciaDisciplinarDto);
  }

  @Get('/:limit/:offset/:ascendente/:esc_id')
  public listar(@Param('limit') limit: number, @Param('offset') offset: number, @Param('ascendente') ascendente: boolean, @Param('esc_id') esc_id: number): Promise<TipoOcorrenciaDisciplinarDto[]> {
    return this.tipoOcorrenciaDisciplinarService.listar(limit, offset, ascendente, esc_id);
  }
  @Get('/estudante/:est_id')
  public listarPorEstudante(@Param('est_id') est_id: number): Promise<TipoOcorrenciaDisciplinarDto[]> {
    console.log(est_id);
    return null;//this.tipoOcorrenciaDisciplinarService.listar(limit, offset, ascendente, esc_id);
  }

  @Patch()
  public alterar(@Body() tipoOcorrenciaDisciplinarDto: TipoOcorrenciaDisciplinarDto): Promise<TipoOcorrenciaDisciplinarDto> {
    return this.tipoOcorrenciaDisciplinarService.alterar(tipoOcorrenciaDisciplinarDto);
  }

  @Delete()
  public excluir(@Body('id') id: number): Promise<DeleteResult> {
    return this.tipoOcorrenciaDisciplinarService.excluir(id);
  }

}
