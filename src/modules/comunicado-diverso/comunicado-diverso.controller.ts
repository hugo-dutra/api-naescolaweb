import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ComunicadoDiversoService } from './comunicado-diverso.service';
import { ComunicadoDiversoDto } from './dto/comunicado-diverso.dto';

@Controller('comunicado-diverso')
export class ComunicadoDiversoController {
  constructor(private comunicadoService: ComunicadoDiversoService) { }

  @Post('multiplos')
  public inserir(@Body() dados: ComunicadoDiversoDto[]): Promise<void> {
    return this.comunicadoService.inserir(dados);
  }

  @Get('/filtrar/:status/:data_inicio/:data_fim/:limit/:offset/:esc_id')
  public filtrar(
    @Param('status') status: boolean, @Param('data_inicio') data_inicio: Date,
    @Param('data_fim') data_fim: Date, @Param('limit') limit: number,
    @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.comunicadoService.filtrar(status, data_inicio, data_fim, limit, offset, esc_id);
  }

}

