import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ComunicadoDiversoService } from './comunicado-diverso.service';
import { ComunicadoDiversoDto } from './dto/comunicado-diverso.dto';

@Controller('comunicado-diverso')
export class ComunicadoDiversoController {
  constructor(private comunicadoService: ComunicadoDiversoService) { }

  @Post()
  public inserir(@Body() dados: ComunicadoDiversoDto): Promise<void> {
    return this.comunicadoService.inserir(dados);
  }

  @Post('multiplos')
  public inserirMultiplos(@Body() dados: ComunicadoDiversoDto[]): Promise<void> {
    return this.comunicadoService.inserirMultiplos(dados);
  }

  @Post('simples')
  public inserirSimples(@Body() dados: ComunicadoDiversoDto): Promise<void> {
    return this.comunicadoService.inserirSimples(dados);
  }

  @Get('/filtrar/:status/:data_inicio/:data_fim/:limit/:offset/:esc_id')
  public filtrar(
    @Param('status') status: number, @Param('data_inicio') data_inicio: Date,
    @Param('data_fim') data_fim: Date, @Param('limit') limit: number,
    @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.comunicadoService.filtrar(status, data_inicio, data_fim, limit, offset, esc_id);
  }

  @Post('/alterar-status-entrega-mensagem')
  public alterarStatusEntregaMensagem(@Body() dados: any[]): Promise<void> {
    return this.comunicadoService.alterarStatusEntregaMensagem(dados);
  }

}

