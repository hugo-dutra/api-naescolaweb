import { PermissaoAcessoService } from './permissao-acesso.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('permissao-acesso')
export class PermissaoAcessoController {
  constructor(private permissaoAcessoService: PermissaoAcessoService) { }

  @Get()
  public listar(): Promise<any[]> {
    return this.permissaoAcessoService.listar();
  }

  @Get('/perfil_usuario_id/:pru_id')
  public listarPorPerfilUsuarioId(@Param('pru_id') pru_id: number): Promise<any[]> {
    return this.permissaoAcessoService.listarPorPerfilUsuarioId(pru_id);
  }


}
