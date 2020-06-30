import { SugestaoUsuarioHistoricoService } from './sugestao-usuario-historico.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('sugestao-usuario-historico')
export class SugestaoUsuarioHistoricoController {
  constructor(private sugestaoUsuarioHistoricoService: SugestaoUsuarioHistoricoService) { }

  @Get('/:sus_id')
  public listar(@Param('sus_id') sus_id: number): Promise<any[]> {
    return this.sugestaoUsuarioHistoricoService.listar(sus_id);
  }
}
