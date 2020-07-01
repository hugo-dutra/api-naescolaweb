import { ComunicadoDiverso } from './../comunicado-diverso/comunicado-diverso.entity';
import { RegraAlertaUsuario } from './../regra-alerta-usuario/regra-alerta-usuario.entity';
import { RegraAlerta } from './../regra-alerta/regra-alerta.entity';
import { SaidaAntecipadaRecorrente } from './../saida-antecipada-recorrente/saida-antecipada-recorrente.entity';
import { AlertaOcorrenciaVerificada } from './../alerta-ocorrencia-verificada/alerta-ocorrencia-verificada.entity';
import { OcorrenciaDisciplinar } from './../ocorrencia-disciplinar/ocorrencia-disciplinar.entity';
import { SugestaoUsuarioHistorico } from './../sugestao-usuario-historico/sugestao-usuario-historico.entity';
import { SugestaoUsuario } from '../sugestao-usuario/sugestao-usuario.entity';
import { PendenciaCarteirinha } from './../pendencia-carteirinha/pendencia-carteirinha.entity';
import { AtestadoMedico } from './../atestado-medico/atestado-medico.entity';
import { ObservacaoTurma } from './../observacao-turma/observacao-turma.entity';
import { ObservacaoEstudante } from './../observacao-estudante/observacao-estudante.entity';
import { UsuarioEscola } from './../usuario-escola/usuario-escola.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, Unique } from "typeorm";
import { PedidoCartao } from '../pedido-cartao/pedido-cartao.entity';
import { AtividadeExtraClasse } from '../atividade-extra-classe/atividade-extra-classe.entity';
import { SaidaAntecipadaEventual } from '../saida-antecipada-eventual/saida-antecipada-eventual.entity';
import { EntradaPosteriorEstudante } from '../entrada-posterior-estudante/entrada-posterior-estudante.entity';
import { UsuarioProfessor } from '../usuario-professor/usuario-professor.entity';

@Entity('usuario_usr')
export class Usuario extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'usr_id_int' })
  id: number;
  @Column({ length: 200, name: 'usr_nome_txt', nullable: false })
  nome: string;
  @Column({ length: 200, name: 'usr_senha_txt', nullable: false })
  senha: string;
  @Column({ length: 200, name: 'usr_email_txt', nullable: false })
  email: string;
  @Column({ length: 200, name: 'usr_salt_txt', nullable: false })
  salt: string;
  @Column({ length: 500, name: 'usr_foto_txt' })
  foto: string;
  /* RELACIONAMENTOS */
  @OneToMany(type => UsuarioEscola, usuarioEscola => usuarioEscola.usuario)
  usuariosEscolas: UsuarioEscola[];
  @OneToOne(type => PedidoCartao, pedidoCartao => pedidoCartao.usuario)
  pedidosCartoes: PedidoCartao[];
  @OneToMany(type => ObservacaoEstudante, observacaoEstudante => observacaoEstudante.usuario)
  observacoesEstudantes: ObservacaoEstudante[];
  @OneToMany(type => ObservacaoTurma, observacaoTurma => observacaoTurma.usuario)
  observacoesTurmas: ObservacaoTurma[];
  @OneToMany(type => AtestadoMedico, atestadoMedico => atestadoMedico.usuario)
  atestadosMedicos: AtestadoMedico[];
  @OneToMany(type => PendenciaCarteirinha, pendenciaCarteirinha => pendenciaCarteirinha.usuario)
  pendenciasCarteirinhas: PendenciaCarteirinha[];
  @OneToMany(type => AtividadeExtraClasse, atividadeExtraClasse => atividadeExtraClasse.usuario)
  atividadesExtraClasse: AtividadeExtraClasse[];
  @OneToMany(type => SugestaoUsuario, sugestaoUsuario => sugestaoUsuario.usuario)
  sugestoesUsuarios: SugestaoUsuario[];
  @OneToMany(type => SugestaoUsuarioHistorico, sugestaoUsuarioHistorico => sugestaoUsuarioHistorico.usuario)
  sugestoesUsuariosHistorico: SugestaoUsuarioHistorico[]
  @OneToMany(type => SaidaAntecipadaEventual, saidaAntecipadaEventual => saidaAntecipadaEventual.usuario)
  saidasAntecipadasEventuais: SaidaAntecipadaEventual[];
  @OneToMany(type => EntradaPosteriorEstudante, entradaPosteriorEstudante => entradaPosteriorEstudante.usuario)
  entradasPosterioresEstudantes: EntradaPosteriorEstudante[];
  @OneToMany(type => OcorrenciaDisciplinar, ocorrenciaDisciplinar => ocorrenciaDisciplinar.usuario)
  ocorrenciasDisciplinares: OcorrenciaDisciplinar[];
  @OneToMany(type => AlertaOcorrenciaVerificada, alertaOcorrenciaVerificada => alertaOcorrenciaVerificada.usuario)
  alertasOcorrenciasVerificadas: AlertaOcorrenciaVerificada[];
  @OneToMany(type => SaidaAntecipadaRecorrente, saidaAntecipadaRecorrente => saidaAntecipadaRecorrente.usuario)
  saidasAntecipadasRecorrentes: SaidaAntecipadaRecorrente[];
  @OneToMany(type => RegraAlerta, regraAlerta => regraAlerta.usuario)
  regrasAlertas: RegraAlerta[];
  @OneToMany(type => RegraAlertaUsuario, regraAlertaUsuario => regraAlertaUsuario.usuario)
  regrasAlertasUsuarios: RegraAlertaUsuario[];
  @OneToMany(type => UsuarioProfessor, usuarioProfessor => usuarioProfessor.usuario)
  usuariosProfessores: UsuarioProfessor[];
  @OneToMany(type => ComunicadoDiverso, comunicadoDiverso => comunicadoDiverso.usuario)
  comunicadosDiversos: ComunicadoDiverso[];
}