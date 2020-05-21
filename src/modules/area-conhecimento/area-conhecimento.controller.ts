import { AreaConhecimentoDto } from './dto/area-conhecimento.dto';
import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { AreaConhecimento } from './area-conhecimento.entity';
import { AreaConhecimentoService } from './area-conhecimento.service';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';

@Controller('area-conhecimento')
export class AreaConhecimentoController {
  constructor(private areaConhecimentoService: AreaConhecimentoService) { }

  @Post()
  public inserirAreaConhecimento(@Body() areaConhecimentoDto: AreaConhecimentoDto): Promise<InsertResult> {
    return this.areaConhecimentoService.inserirAreaConhecimento(areaConhecimentoDto);
  }

  @Get()
  public listarAreaConhecimento(): Promise<AreaConhecimento[]> {
    return this.areaConhecimentoService.listarAreaConhecimento();
  }

  @Patch()
  public alterarAreaConhecimento(@Body() areaConhecimentoDto: AreaConhecimentoDto): Promise<AreaConhecimentoDto> {
    return this.areaConhecimentoService.alterarAreaConhecimento(areaConhecimentoDto);
  }

  @Delete()
  public excluirAreaConhecimento(@Body() areaConhecimentoDto: AreaConhecimentoDto): Promise<DeleteResult> {
    return this.areaConhecimentoService.excluirAreaConhecimento(areaConhecimentoDto.id);
  }

}
