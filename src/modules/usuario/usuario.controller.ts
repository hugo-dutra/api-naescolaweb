import { Controller, Get, Param, Patch, Body, Delete, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) { }

  @Post()
  public inserir(@Body() usuarioDto: any): Promise<void> {
    return this.usuarioService.inserir(usuarioDto);
  }

  @Post('/modificar-senha')
  public modificarSenha(@Body() dados: any): Promise<void> {
    return this.usuarioService.modificarSenha(dados);
  }

  @Post('/logar')
  public logar(@Body() dados: any): Promise<void> {
    return this.usuarioService.logar(dados);
  }

  @Get('/por-escola-id/:esc_id/:todos')
  public listarPorEscolaId(@Param('esc_id') esc_id: number, @Param('todos') todos: string): Promise<any[]> {
    return this.usuarioService.listarPorEscolaId(esc_id, todos);
  }

  @Get('/local/:limit/:offset/:asc/:esc_id')
  public listarLocal(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.usuarioService.listarLocal(limit, offset, asc, esc_id);
  }

  @Get('/regional/:limit/:offset/:asc/:esc_id')
  public listarRegional(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.usuarioService.listarRegional(limit, offset, asc, esc_id);
  }

  @Get('/:limit/:offset/:asc')
  public listarGlobal(@Param('limit') limit: number, @Param('offset') offset: number, @Param('asc') asc: boolean): Promise<any[]> {
    return this.usuarioService.listarGlobal(limit, offset, asc);
  }

  @Get('/filtrar-local/:valor/:limit/:offset/:esc_id')
  public filtrarLocal(@Param('valor') valor: string, @Param('limit') limit: number, @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.usuarioService.filtrarLocal(valor, limit, offset, esc_id);
  }

  @Get('/filtrar-regional/:valor/:limit/:offset/:esc_id')
  public filtrarRegional(@Param('valor') valor: string, @Param('limit') limit: number, @Param('offset') offset: number, @Param('esc_id') esc_id: number): Promise<any[]> {
    return this.usuarioService.filtrarRegional(valor, limit, offset, esc_id);
  }

  @Get('/filtrar/:valor/:limit/:offset')
  public filtrarGlobal(@Param('valor') valor: string, @Param('limit') limit: number, @Param('offset') offset: number): Promise<any[]> {
    return this.usuarioService.filtrarGlobal(valor, limit, offset);
  }

  @Patch()
  public alterar(@Body() usuarioRecebido: any): Promise<void> {
    return this.usuarioService.alterar(usuarioRecebido);
  }

  @Delete()
  public excluir(@Body() parametros: any): Promise<void> {
    return this.usuarioService.excluir(parametros);
  }

}
