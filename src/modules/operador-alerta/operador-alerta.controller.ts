import { Controller, Get } from '@nestjs/common';
import { OperadorAlertaService } from './operador-alerta.service';

@Controller('operador-alerta')
export class OperadorAlertaController {
  constructor(private operadorAlertaService: OperadorAlertaService) { }

  @Get()
  public listar(): Promise<any[]> {
    return this.operadorAlertaService.listar();
  }
}
