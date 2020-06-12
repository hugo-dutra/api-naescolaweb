import { RegraAlertaUsuarioService } from './regra-alerta-usuario.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RegraAlertaUsuario } from './regra-alerta-usuario.entity';
import { DeleteResult } from 'typeorm';

@Controller('regra-alerta-usuario')
export class RegraAlertaUsuarioController {
  constructor(private regraAlertaUsuarioService: RegraAlertaUsuarioService) { }

  @Post()
  public inserir(@Body() regraAlertaUsuario: RegraAlertaUsuario[]): Promise<RegraAlertaUsuario[]> {
    return this.regraAlertaUsuarioService.inserir(regraAlertaUsuario);
  }

  @Post('/excluir')
  public excluir(@Body() dados: any[]): Promise<DeleteResult> {
    return this.regraAlertaUsuarioService.excluir(dados);
  }

  @Get('/:usr_id/:esc_id')
  public listarPorUsuarioIdEscolaId(@Param('usr_id') usr_id: number, @Param('esc_id') esc_id: number): Promise<any> {
    return this.regraAlertaUsuarioService.listarPorUsuarioIdEscolaId(usr_id, esc_id);
  }

}
