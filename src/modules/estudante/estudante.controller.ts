import { EstudanteService } from './estudante.service';
import { Controller, Post, Body, Param } from '@nestjs/common';
import { EstudanteIntegracaoDto } from './dto/estudante-integracao.dto';

@Controller('estudante')
export class EstudanteController {
  constructor(private estudanteService: EstudanteService) { }

  @Post('/integracao/:esc_id')
  public inserirEstudanteIntegracao(@Body() estudantesIntegracaoDto: EstudanteIntegracaoDto[], @Param('esc_id') esc_id: number): Promise<any> {
    return this.estudanteService.inserirEstudanteIntegracao(estudantesIntegracaoDto, esc_id);
  }
}
