import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { SugestaoUsuarioService } from './susgestao-usuario.service';

@Controller('sugestao-usuario')
export class SugestaoUsuarioController {
  constructor(private sugestaoUsuarioServide: SugestaoUsuarioService) { }

  @Post()
  public inserir(@Body() dados: any): Promise<void> {
    return this.sugestaoUsuarioServide.inserir(dados);
  }

  @Get('/:data_inicio/:data_fim/:esc_id/:escopo/:statusSugestao')
  public listar(
    @Param('data_inicio') data_inicio: Date, @Param('data_fim') data_fim: Date,
    @Param('esc_id') esc_id: number, @Param('escopo') escopo: string, @Param('statusSugestao') statusSugestao: string): Promise<any[]> {
    return this.sugestaoUsuarioServide.listar(data_inicio, data_fim, esc_id, escopo, statusSugestao);
  }

  @Patch()
  public alterar(@Body() dados: any): Promise<void> {
    return this.sugestaoUsuarioServide.alterar(dados);
  }


}
