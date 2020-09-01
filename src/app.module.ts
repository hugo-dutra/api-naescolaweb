import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { RedeEnsinoModule } from './modules/rede-ensino/rede-ensino.module';
import { RegiaoEscolaModule } from './modules/regiao-escola/regiao-escola.module';
import { EscolaModule } from './modules/escola/escola.module';
import { DiretorModule } from './modules/diretor/diretor.module';
import { DiretorEscolaModule } from './modules/diretor-escola/diretor-escola.module';
import { TurnoModule } from './modules/turno/turno.module';
import { EtapaEnsinoModule } from './modules/etapa-ensino/etapa-ensino.module';
import { SerieModule } from './modules/serie/serie.module';
import { TurmaModule } from './modules/turma/turma.module';
import { BoletoMensalidadeModule } from './modules/boleto-mensalidade/boleto-mensalidade.module';
import { EstudanteModule } from './modules/estudante/estudante.module';
import { EstudanteTurmaModule } from './modules/estudante-turma/estudante-turma.module';
import { TelefoneContatoEstudanteModule } from './modules/telefone-contato-estudante/telefone-contato-estudante.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { EscopoPerfilUsuarioModule } from './modules/escopo-perfil-usuario/escopo-perfil-usuario.module';
import { PerfilUsuarioModule } from './modules/perfil-usuario/perfil-usuario.module';
import { UsuarioEscolaModule } from './modules/usuario-escola/usuario-escola.module';
import { GrupoAcessoModule } from './modules/grupo-acesso/grupo-acesso.module';
import { MenuAcessoModule } from './modules/menu-acesso/menu-acesso.module';
import { PermissaoAcessoModule } from './modules/permissao-acesso/permissao-acesso.module';
import { PerfilPermissaoModule } from './modules/perfil-permissao/perfil-permissao.module';
import { MapaMensaoNotaModule } from './modules/mapa-mensao-nota/mapa-mensao-nota.module';
import { EntidadeEstudantilModule } from './modules/entidade-estudantil/entidade-estudantil.module';
import { ModeloCartaoModule } from './modules/modelo-cartao/modelo-cartao.module';
import { BoletoPedidoCartaoModule } from './modules/boleto-pedido-cartao/boleto-pedido-cartao.module';
import { PedidoCartaoModule } from './modules/pedido-cartao/pedido-cartao.module';
import { CartaoPedidoModule } from './modules/cartao-pedido/cartao-pedido.module';
import { ObservacaoEstudanteModule } from './modules/observacao-estudante/observacao-estudante.module';
import { ObservacaoTurmaModule } from './modules/observacao-turma/observacao-turma.module';
import { AtestadoMedicoModule } from './modules/atestado-medico/atestado-medico.module';
import { PendenciaCarteirinhaModule } from './modules/pendencia-carteirinha/pendencia-carteirinha.module';
import { AnexoAtividadeExtraModule } from './modules/anexo-atividade-extra/anexo-atividade-extra.module';
import { AtividadeExtraClasseModule } from './modules/atividade-extra-classe/atividade-extra-classe.module';
import { AtividadeExtraEstudanteModule } from './modules/atividade-extra-estudante/atividade-extra-estudante.module';
import { TurnoPortariaModule } from './modules/turno-portaria/turno-portaria.module';
import { PortariaModule } from './modules/portaria/portaria.module';
import { CronogramaPortariaModule } from './modules/cronograma-portaria/cronograma-portaria.module';
import { SugestaoUsuarioModule } from './modules/sugestao-usuario/susgestao-usuario.module';
import { SugestaoUsuarioHistoricoModule } from './modules/sugestao-usuario-historico/sugestao-usuario-historico.module';
import { SaidaAntecipadaEventualModule } from './modules/saida-antecipada-eventual/saida-antecipada-eventual.module';
import { EntradaPosteriorEstudanteModule } from './modules/entrada-posterior-estudante/entrada-posterior-estudante.module';
import { OcorrenciaDisciplinarModule } from './modules/ocorrencia-disciplinar/ocorrencia-disciplinar.module';
import { TipoOcorrenciaDisciplinarModule } from './modules/tipo-ocorrencia-disciplinar/tipo-ocorrencia-disciplinar.module';
import { StatusEntregaMensagemModule } from './modules/status-entrega-mensagem/status-entrega-mensagem.module';
import { ObservacaoAlertaOcorrenciaVerificadaModule } from './modules/observacao-alerta-ocorrencia-verificada/observacao-alerta-ocorrencia-verificada.module';
import { AlertaOcorrenciaVerificadaModule } from './modules/alerta-ocorrencia-verificada/alerta-ocorrencia-verificada.module';
import { SaidaAntecipadaRecorrenteModule } from './modules/saida-antecipada-recorrente/saida-antecipada-recorrente.module';
import { OperadorAlertaModule } from './modules/operador-alerta/operador-alerta.module';
import { RegraAlertaModule } from './modules/regra-alerta/regra-alerta.module';
import { RegraAlertaUsuarioModule } from './modules/regra-alerta-usuario/regra-alerta-usuario.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { UsuarioProfessorModule } from './modules/usuario-professor/usuario-professor.module';
import { ProfessorEscolaModule } from './modules/professor-escola/professor-escola.module';
import { ProfessorDisciplinaModule } from './modules/professor-disciplina/professor-disciplina.module';
import { ProfessorTurmaModule } from './modules/professor-turma/professor-turma.module';
import { DisciplinaModule } from './modules/disciplina/disciplina.module';
import { AreaConhecimentoModule } from './modules/area-conhecimento/area-conhecimento.module';
import { ResultadoBoletimModule } from './modules/resultado-boletim/resultado-boletim.module';
import { DiarioProfessorModule } from './modules/diario-professor/diario-professor.module';
import { DiarioObservacoesGeraisModule } from './modules/diario-observacoes-gerais/diario-observacoes-gerais.module';
import { DiarioObservacaoEstudanteModule } from './modules/diario-observacao-estudante/diario-observacao-estudante.module';
import { DiarioAvaliacaoDiagnosticaModule } from './modules/diario-avaliacao-diagnostica/diario-avaliacao-diagnostica.module';
import { RegistroDiarioModule } from './modules/registro-diario/registro-diario.module';
import { DiarioAvaliacaoModule } from './modules/diario-avaliacao/diario-avaliacao.module';
import { RegistroFrequenciaModule } from './modules/registro-frequencia/registro-frequencia.module';
import { ComunicadoDiversoModule } from './modules/comunicado-diverso/comunicado-diverso.module';
import { FrequenciaPortariaModule } from './modules/frequencia-portaria/frequencia-portaria.module';
import { PeriodoLetivoModule } from './modules/periodo-letivo/periodo-letivo.module';
import { BoletimEscolarModule } from './modules/boletim-escolar/boletim-escolar.module';
import { AvaliacaoEstudanteModule } from './modules/avaliacao-estudante/avaliacao-estudante.module';
import { SistemaModule } from './modules/sistema/sistema.module';
import { MensaoModule } from './modules/mencao/mencao.module';
import { TipoMedidaAvaliacaoModule } from './modules/tipo-medida-avaliacao/tipo-medida-avaliacao.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RedeEnsinoModule,
    RegiaoEscolaModule,
    EscolaModule,
    DiretorModule,
    DiretorEscolaModule,
    TurnoModule,
    EtapaEnsinoModule,
    SerieModule,
    TurmaModule,
    BoletoMensalidadeModule,
    EstudanteModule,
    EstudanteTurmaModule,
    TelefoneContatoEstudanteModule,
    UsuarioModule,
    EscopoPerfilUsuarioModule,
    PerfilUsuarioModule,
    UsuarioEscolaModule,
    GrupoAcessoModule,
    MenuAcessoModule,
    PermissaoAcessoModule,
    PerfilPermissaoModule,
    MapaMensaoNotaModule,
    EntidadeEstudantilModule,
    ModeloCartaoModule,
    BoletoPedidoCartaoModule,
    PedidoCartaoModule,
    CartaoPedidoModule,
    ObservacaoEstudanteModule,
    ObservacaoTurmaModule,
    AtestadoMedicoModule,
    PendenciaCarteirinhaModule,
    AnexoAtividadeExtraModule,
    AtividadeExtraClasseModule,
    AtividadeExtraEstudanteModule,
    TurnoPortariaModule,
    PortariaModule,
    CronogramaPortariaModule,
    SugestaoUsuarioModule,
    SugestaoUsuarioHistoricoModule,
    SaidaAntecipadaEventualModule,
    EntradaPosteriorEstudanteModule,
    OcorrenciaDisciplinarModule,
    TipoOcorrenciaDisciplinarModule,
    StatusEntregaMensagemModule,
    ObservacaoAlertaOcorrenciaVerificadaModule,
    AlertaOcorrenciaVerificadaModule,
    SaidaAntecipadaRecorrenteModule,
    OperadorAlertaModule,
    RegraAlertaModule,
    RegraAlertaUsuarioModule,
    ProfessorModule,
    UsuarioProfessorModule,
    ProfessorEscolaModule,
    ProfessorDisciplinaModule,
    ProfessorTurmaModule,
    DisciplinaModule,
    AreaConhecimentoModule,
    ResultadoBoletimModule,
    DiarioProfessorModule,
    DiarioObservacoesGeraisModule,
    DiarioObservacaoEstudanteModule,
    DiarioAvaliacaoDiagnosticaModule,
    RegistroDiarioModule,
    DiarioAvaliacaoModule,
    RegistroFrequenciaModule,
    ComunicadoDiversoModule,
    FrequenciaPortariaModule,
    PeriodoLetivoModule,
    BoletimEscolarModule,
    AvaliacaoEstudanteModule,
    SistemaModule,
    MensaoModule,
    TipoMedidaAvaliacaoModule,
  ],
})
export class AppModule { }
