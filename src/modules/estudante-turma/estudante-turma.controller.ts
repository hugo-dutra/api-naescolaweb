import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { EstudanteIntegracaoEnturmarDto } from './dto/estudante-integracao-enturmar.dto';
import { EstudanteTurmaService } from './estudante-turma.service';
import { UpdateResult } from 'typeorm';

@Controller('estudante-turma')
export class EstudanteTurmaController {
  constructor(private estudanteTurmaService: EstudanteTurmaService) { }

  @Post('/enturmar/integracao')
  public enturmarEstudanteIntegracao(@Body() estudantesEnturmarIntegracao: any[]): Promise<void> {
    const esc_id = estudantesEnturmarIntegracao['esc_id']
    const estudantesTurmas = estudantesEnturmarIntegracao['estudantes'];
    const estudantesEnturmar: EstudanteIntegracaoEnturmarDto[] = estudantesTurmas.map(estudante => {
      const estudanteEnturmar = new EstudanteIntegracaoEnturmarDto();
      estudanteEnturmar.id = estudante['idpes'];
      estudanteEnturmar.trm_id = estudante['cod_turma'];
      estudanteEnturmar.numero_chamada = 0;
      return estudanteEnturmar
    });
    return this.estudanteTurmaService.inserirIntegracao(estudantesEnturmar, esc_id);
  }

  @Post('/enturmar/via-importacao')
  public enturmarEstudanteViaImportacao(@Body() estudantes: any[]): Promise<void> {
    return this.estudanteTurmaService.inserirViaImportacao(estudantes);
  }

  @Post('/enturmar')
  public enturmar(@Body() dados: any[]): Promise<void> {
    return this.estudanteTurmaService.enturmar(dados);
  }

  @Post('/alterar-manual-numero-chamada')
  public alterarManualNumeroChamada(@Body() dados: any): Promise<UpdateResult> {
    return this.estudanteTurmaService.alterarManualNumeroChamada(dados)
  }

  @Post('/desabilitar-turma-estudante-transferido')
  public desabilitarTransferidos(@Body() parametros: any): Promise<void> {
    const esc_id = parametros['esc_id'];
    const listaEstId = parametros['listaEstId'];
    return this.estudanteTurmaService.desabilitarTransferidos(esc_id, listaEstId);
  }

  @Get('/serie-turma-turno-etapa/:est_id')
  public listarSerieTurmaTurnoEtapa(@Param('est_id') est_id: number): Promise<any> {
    return this.estudanteTurmaService.listarSerieTurmaTurnoEtapa(est_id);
  }

  @Patch()
  public alterar(@Body() dados: any): Promise<any> {
    return this.estudanteTurmaService.alterarTurma(dados);
  }

}
