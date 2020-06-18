import { RegistroFrequenciaService } from './registro-frequencia.service';
import { Controller, Get, Param, Patch, Body } from '@nestjs/common';

@Controller('registro-frequencia')
export class RegistroFrequenciaController {
  constructor(private registroFrequenciaService: RegistroFrequenciaService) { }

  @Get('/:rdi_id')
  public listar(@Param('rdi_id') rdi_id: number): Promise<any[]> {
    return this.registroFrequenciaService.listar(rdi_id);
  }

  @Patch()
  public alterar(@Body() dados: any): Promise<void> {
    return this.registroFrequenciaService.alterar(dados);
  }
}
