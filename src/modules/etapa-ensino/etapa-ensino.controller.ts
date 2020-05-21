import { EtapaEnsinoDto } from './dto/etapa-ensino.dto';
import { EtapaEnsinoService } from './etapa-ensino.service';
import { Controller, Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { InsertResult, DeleteResult } from 'typeorm';
import { EtapaEnsino } from './etapa-ensino.entity';

@Controller('etapa-ensino')
export class EtapaEnsinoController {
  constructor(private etapaEnsinoService: EtapaEnsinoService) { }

  @Post()
  public inserirEtapaEnsino(@Body() etapaEnsinoDto: EtapaEnsinoDto): Promise<InsertResult> {
    return this.etapaEnsinoService.inserirEtapaEnsino(etapaEnsinoDto);
  }

  @Get()
  public listarEtapasEnsino(): Promise<EtapaEnsino[]> {
    return this.etapaEnsinoService.listarEtapasEnsino();
  }

  @Patch()
  public alterarEtapaEnsino(@Body() etapaEnsinoDto: EtapaEnsinoDto): Promise<EtapaEnsinoDto> {
    return this.etapaEnsinoService.alterarEtapaEnsino(etapaEnsinoDto);
  }

  @Delete()
  public excluirEtapaEnsino(@Body() etapaEnsinoDto: EtapaEnsinoDto): Promise<DeleteResult> {
    return this.etapaEnsinoService.excluirEtapaEnsino(etapaEnsinoDto.id);
  }


}
