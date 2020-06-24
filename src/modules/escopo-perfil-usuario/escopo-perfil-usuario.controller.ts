import { EscopoPerfilUsuarioService } from './escopo-perfil-usuario.service';
import { Controller, Get } from '@nestjs/common';

@Controller('escopo-perfil-usuario')
export class EscopoPerfilUsuarioController {
  constructor(private escopoPerfilUsuarioService: EscopoPerfilUsuarioService) { }

  @Get()
  public listar(): Promise<any[]> {
    return this.escopoPerfilUsuarioService.listar();
  }
}
