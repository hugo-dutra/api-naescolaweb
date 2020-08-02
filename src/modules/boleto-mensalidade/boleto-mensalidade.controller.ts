import { BoletoMensalidadeService } from './boleto-mensalidade.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('boleto-mensalidade')
export class BoletoMensalidadeController {
  constructor(private boletoMensalidadeService: BoletoMensalidadeService) { }

  @Post()
  public inserir(@Body() params: any): Promise<any> {
    return this.boletoMensalidadeService.inserir(params);
  }

  @Get('/:ano/:esc_id')
  public listar(@Param('ano') ano: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.boletoMensalidadeService.listar(ano, esc_id);
  }

}
