import { RegistroDiarioService } from './registro-diario.service';
import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';

@Controller('registro-diario')
export class RegistroDiarioController {
  constructor(private registroDiarioService: RegistroDiarioService) { }

  @Post()
  public inserir(@Body() dados: any): Promise<void> {
    return this.registroDiarioService.inserir(dados);
  }

  @Get('/:dip_id')
  public listar(@Param('dip_id') dip_id: number): Promise<any[]> {
    return this.registroDiarioService.listar(dip_id);
  }

  @Patch()
  public alterar(@Body() dados: any): Promise<void> {
    return this.registroDiarioService.alterar(dados);
  }
}
