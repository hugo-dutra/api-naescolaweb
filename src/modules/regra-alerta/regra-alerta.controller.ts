import { Controller, Body, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { RegraAlerta } from './regra-alerta.entity';
import { RegraAlertaService } from './regra-alerta.service';
import { DeleteResult } from 'typeorm';

@Controller('regra-alerta')
export class RegraAlertaController {
  constructor(private regraAlertaService: RegraAlertaService) { }

  @Post()
  public inserir(@Body() regraAlerta: RegraAlerta): Promise<RegraAlerta> {
    return this.regraAlertaService.inserir(regraAlerta);
  }

  @Get('/:esc_id')
  public listar(@Param('esc_id') esc_id: number): Promise<any[]> {
    return this.regraAlertaService.listar(esc_id);
  }

  @Patch()
  public alterar(@Body() regraAlerta: RegraAlerta): Promise<RegraAlerta> {
    return this.regraAlertaService.alterar(regraAlerta);
  }

  @Delete()
  public excluir(@Body() id: number): Promise<DeleteResult> {
    return this.regraAlertaService.excluir(id);
  }


}
