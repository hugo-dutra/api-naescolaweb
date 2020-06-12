import { AlertaOcorrenciaVerificadaService } from './alerta-ocorrencia-verificada.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('alerta-ocorrencia-verificada')
export class AlertaOcorrenciaVerificadaController {
  constructor(private AlertaOcorrenciaVerificadaService: AlertaOcorrenciaVerificadaService) { }

  @Post()
  public inserir(@Body() dados: any): Promise<any> {
    return this.AlertaOcorrenciaVerificadaService.inserir(dados);
  }
}
