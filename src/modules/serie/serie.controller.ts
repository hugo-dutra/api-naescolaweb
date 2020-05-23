import { SerieService } from './serie.service';
import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { Serie } from './serie.entity';
import { DeleteResult } from 'typeorm';
import { SerieEtapaDto } from './dto/serie-etapa.dto';
import { SerieIntegracao } from './dto/serie-integracao.dto';
import { Utils } from 'src/utils/utils';

@Controller('serie')
export class SerieController {
  private utils = new Utils();
  constructor(private serieService: SerieService) { }

  @Post()
  public inserirSerie(@Body() serie: Serie): Promise<Serie> {
    return this.serieService.inserirSerie(serie);
  }

  @Post('/integracao')
  public inserirSerieIntegracao(@Body() series: SerieIntegracao[]): Promise<Serie[]> {
    const seriesIntegracao = series.map((serieIntegracao: SerieIntegracao) => {
      const serie = new Serie();
      serie.id = serieIntegracao.cod_serie;
      serie.abreviatura = this.utils.extrairSubString(serieIntegracao.nm_serie, 2);
      serie.ete_id = serieIntegracao.cod_curso;
      serie.nome = serieIntegracao.nm_serie;
      return serie;
    });
    return this.serieService.inserirSerieIntegracao(seriesIntegracao);
  }

  @Get()
  public listarSeries(): Promise<SerieEtapaDto[]> {
    return this.serieService.listarSeries();
  }

  @Patch()
  public alterarSerie(@Body() serie: Serie): Promise<Serie> {
    return this.serieService.alterarSerie(serie);
  }

  @Delete()
  public excluirSerie(@Body() serie: Serie): Promise<DeleteResult> {
    return this.serieService.excluirSerie(serie.id);
  }

}
