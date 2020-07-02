import { UsuarioEscolaService } from './usuario-escola.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('usuario-escola')
export class UsuarioEscolaController {
  constructor(private usuarioEscolaService: UsuarioEscolaService) { }

  @Post()
  public inserir(@Body() dados: any): Promise<void> {
    return this.usuarioEscolaService.inserir(dados)
  }

  @Post('/alterar-status')
  public alterarStatus(@Body() dados: any): Promise<void> {
    return this.usuarioEscolaService.alterarStatus(dados)
  }

  @Post('/excluir')
  public excluir(@Body() dados: any): Promise<void> {
    return this.usuarioEscolaService.excluir(dados)
  }

  @Get('/escola-perfil-status/:usr_id/:esc_id/:usr_id_solicitante')
  public listarEscolaPerfilStatus(@Param('usr_id') usr_id: number, @Param('esc_id') esc_id: number, @Param('usr_id_solicitante') usr_id_solicitante: number): Promise<any[]> {
    return this.usuarioEscolaService.listarEscolaPerfilStatus(usr_id, esc_id, usr_id_solicitante);
  }


}
