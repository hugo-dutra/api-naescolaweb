import { Controller, Body, Post, Get, Patch, Delete, Param } from '@nestjs/common';
import { MetricaLivreService } from './metrica-livre.service';
import { MetricaLivreDto } from './dto/metrica-livre.dto';
import { DeleteResult } from 'typeorm';

@Controller('metrica-livre')
export class MetricaLivreController {

  constructor(private metricaLivreService: MetricaLivreService) { }

  @Post()
  public inserir(@Body() metricaLivreDto: MetricaLivreDto): Promise<MetricaLivreDto> {
    return this.metricaLivreService.inserir(metricaLivreDto);
  }

  @Get('/:esc_id')
  public listarPorEscolaId(@Param('esc_id') escId: number): Promise<MetricaLivreDto[]> {
    return this.metricaLivreService.listarPorEscolaId(escId);
  }

  @Patch()
  public alterar(@Body() metricaLivreDto: MetricaLivreDto): Promise<MetricaLivreDto> {
    return this.metricaLivreService.alterar(metricaLivreDto);
  }

  @Delete()
  public excluir(@Body() id: number): Promise<DeleteResult> {
    return this.metricaLivreService.excluir(id);
  }


}
