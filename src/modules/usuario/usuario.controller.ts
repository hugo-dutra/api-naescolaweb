import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) { }

  @Get('/por-escola-id/:esc_id/:todos')
  public listarPorEscolaId(@Param('esc_id') esc_id: number, @Param('todos') todos: string): Promise<any[]> {
    return this.usuarioService.listarPorEscolaId(esc_id, todos);
  }
}
