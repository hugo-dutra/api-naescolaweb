import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { PortariaService } from './portaria.service';

@Controller('portaria')
export class PortariaController {
  constructor(private portariaService: PortariaService) { }

  @Post()
  public inserir(@Body() portaria: any): Promise<any> {
    return this.portariaService.inserir(portaria);
  }

  @Get('/:esc_id')
  public listar(@Param('esc_id') esc_id: number): Promise<any> {
    return this.portariaService.listar(esc_id);
  }

  @Patch()
  public alterar(@Body() portaria: any): Promise<any> {
    return this.portariaService.alterar(portaria);
  }
}
