import { AnexoAtividadeExtraService } from './anexo-atividade-extra.service';
import { Controller, Body, Post, Get, Param } from '@nestjs/common';

@Controller('anexo-atividade-extra')
export class AnexoAtividadeExtraController {
  constructor(private anexoAtividadeExtraService: AnexoAtividadeExtraService) { }

  @Post()
  public inserir(@Body() dados: any[]): Promise<any> {
    return this.anexoAtividadeExtraService.inserir(dados);
  }

  @Get('/:aec_id')
  public listar(@Param('aec_id') aec_id: number): Promise<any[]> {
    return this.anexoAtividadeExtraService.listar(aec_id);
  }
}

