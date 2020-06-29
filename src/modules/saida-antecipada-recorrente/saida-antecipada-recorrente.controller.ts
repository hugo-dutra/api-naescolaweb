import { SaidaAntecipadaRecorrenteService } from './saida-antecipada-recorrente.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('saida-antecipada-recorrente')
export class SaidaAntecipadaRecorrenteController {
  constructor(private saidaAntecipadaRecorrenteService: SaidaAntecipadaRecorrenteService) { }

  @Post()
  public inserirAlterar(@Body() dados: any): Promise<void> {
    return this.saidaAntecipadaRecorrenteService.inserirAlterar(dados);
  }


}
