import { EtapaEnsinoDto } from './dto/etapa-ensino.dto';
import { EtapaEnsinoService } from './etapa-ensino.service';
import { Controller, Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { InsertResult, DeleteResult } from 'typeorm';
import { EtapaEnsino } from './etapa-ensino.entity';
import { EtapaEnsinoIntegracaoDto } from './dto/etapa-ensino-integracao.dto';
import { Utils } from 'src/utils/utils';

@Controller('etapa-ensino')
export class EtapaEnsinoController {
  private utils = new Utils();
  constructor(private etapaEnsinoService: EtapaEnsinoService) { }

  @Post()
  public inserirEtapaEnsino(@Body() etapaEnsinoDto: EtapaEnsinoDto): Promise<InsertResult> {
    return this.etapaEnsinoService.inserirEtapaEnsino(etapaEnsinoDto);
  }

  @Post('/integracao')
  public inserirEtapaEnsinoIntegracao(@Body() etapasEnsinoIntegracaoDto: EtapaEnsinoIntegracaoDto[]): Promise<EtapaEnsinoDto[]> {
    const etapasEnsinoDto = etapasEnsinoIntegracaoDto.map((etapa: EtapaEnsinoIntegracaoDto) => {
      const abrv = this.utils.abreviarStringComIniciais(etapa.nm_curso);
      return { id: etapa.cod_curso, nome: etapa.nm_curso, abreviatura: abrv }
    });
    return this.etapaEnsinoService.inserirEtapaEnsinoIntegracao(etapasEnsinoDto);
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
