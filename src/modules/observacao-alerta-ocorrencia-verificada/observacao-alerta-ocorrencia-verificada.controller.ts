import { Controller, Post, Body } from '@nestjs/common';
import { ObservacaoAlertaOcorrenciaVerificadaService } from './observacao-alerta-ocorrencia-verificada.service';

@Controller('observacao-alerta-ocorrencia-verificada')
export class ObservacaoAlertaOcorrenciaVerificadaController {
  constructor(private observacaoAlertaOcorrenciaVerificadaService: ObservacaoAlertaOcorrenciaVerificadaService) { }

  @Post()
  public inserir(@Body() dados: any): Promise<any> {
    return this.observacaoAlertaOcorrenciaVerificadaService.inserir(dados);
  }


}

