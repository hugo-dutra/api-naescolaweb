import { ResultadoBoletimService } from './resultado-boletim.service';
import { Controller, Post, Body } from '@nestjs/common';
import { ResultadoBoletim } from './resultado-boletim.entity';


@Controller('resultado-boletim')
export class ResultadoBoletimController {
  constructor(private resultadoBoletimService: ResultadoBoletimService) { }

  @Post()
  public inserir(@Body() resultadosConsolidados: any[]): Promise<void> {
    return this.resultadoBoletimService.inserir(resultadosConsolidados);
  }
}

