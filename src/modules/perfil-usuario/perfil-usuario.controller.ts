import { PerfilUsuarioService } from './perfil-usuario.service';
import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';

@Controller('perfil-usuario')
export class PerfilUsuarioController {
  constructor(private perfilUsuarioService: PerfilUsuarioService) { }

  @Get('/:nivel/:esc_id')
  public listar(@Param('nivel') nivel: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.perfilUsuarioService.listar(nivel, esc_id);
  }

  @Post()
  public inserir(@Body() perfil: any): Promise<void> {
    return this.perfilUsuarioService.inserir(perfil);
  }

  @Patch()
  public alterar(@Body() perfil: any): Promise<void> {
    return this.perfilUsuarioService.alterar(perfil);
  }

  @Delete()
  public excluir(@Body() id: any): Promise<void> {
    return this.perfilUsuarioService.excluir(id)
  }


}
