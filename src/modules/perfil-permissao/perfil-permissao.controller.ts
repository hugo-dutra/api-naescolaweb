import { PerfilPermissaoService } from './perfil-permissao.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('perfil-permissao')
export class PerfilPermissaoController {
  constructor(private perfilPermissaoService: PerfilPermissaoService) { }

  @Post()
  public inserir(@Body() perfilPermissao: any): Promise<void> {
    return this.perfilPermissaoService.inserir(perfilPermissao);
  }
}
