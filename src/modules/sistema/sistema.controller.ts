import { Controller, Get, Param } from '@nestjs/common';
import { SistemaService } from './sistema.service';


@Controller('sistema')
export class SistemaController {
  constructor(private sistemaService: SistemaService) { }

  @Get('/listar-campos/:tabela')
  public listarCampos(@Param('tabela') tabela: string): Promise<any[]> {
    return this.sistemaService.listarCampos(tabela);
  }

  @Get('/dados-campos-tabela/:campos/:esc_id/:ordem')
  public listarCamposTabela(@Param('campos') campos: string, @Param('esc_id') esc_id: number, @Param('ordem') ordem: string): Promise<any[]> {
    return this.sistemaService.listarCamposTabela(campos, esc_id, ordem);
  }


}
