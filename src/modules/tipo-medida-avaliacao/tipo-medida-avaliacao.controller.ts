import { TipoMedidaAvaliacaoService } from './tipo-medida-avaliacao.service';
import { Controller, Get } from '@nestjs/common';
import { TipoMedidaAvaliacao } from './tipo-medida-avaliacao.entity';

@Controller('tipo-medida-avaliacao')
export class TipoMedidaAvaliacaoController {
  constructor(private tipoMedidaAvaliacaoService: TipoMedidaAvaliacaoService) { }

  @Get()
  public listar(): Promise<TipoMedidaAvaliacao[]> {
    return this.tipoMedidaAvaliacaoService.listar();
  }

}
