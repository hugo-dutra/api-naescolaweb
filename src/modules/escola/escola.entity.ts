import { TipoOcorrenciaDisciplinar } from './../tipo-ocorrencia-disciplinar/tipo-ocorrencia-disciplinar.entity';
import { ProfessorEscola } from './../professor-escola/professor-escola.entity';
import { RegraAlertaUsuario } from './../regra-alerta-usuario/regra-alerta-usuario.entity';
import { RegraAlerta } from './../regra-alerta/regra-alerta.entity';
import { AlertaOcorrenciaVerificada } from './../alerta-ocorrencia-verificada/alerta-ocorrencia-verificada.entity';
import { SugestaoUsuario } from '../sugestao-usuario/sugestao-usuario.entity';
import { PedidoCartao } from './../pedido-cartao/pedido-cartao.entity';
import { UsuarioEscola } from './../usuario-escola/usuario-escola.entity';
import { PerfilUsuario } from './../perfil-usuario/perfil-usuario.entity';
import { BoletoMensalidade } from './../boleto-mensalidade/boleto-mensalidade.entity';
import { RedeEnsino } from '../rede-ensino/rede-ensino.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { RegiaoEscola } from "../regiao-escola/regiao-escola.entity";
import { DiretorEscola } from '../diretor-escola/diretor-escola.entity';
import { Turno } from '../turno/turno.entity';
import { Turma } from '../turma/turma.entity';
import { Estudante } from '../estudante/estudante.entity';
import { Portaria } from '../portaria/portaria.entity';
import { EntradaPosteriorEstudante } from '../entrada-posterior-estudante/entrada-posterior-estudante.entity';
import { ProfessorTurma } from '../professor-turma/professor-turma.entity';
import { Mensao } from '../mensao/mensao.entity';

@Entity('escola_esc')
export class Escola extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'esc_id_int' })
  id: number;
  @Column({ length: 250, name: 'esc_nome_txt' })
  nome: string;
  @Column({ length: 200, name: 'esc_email_txt' })
  email: string;
  @Column({ length: 25, name: 'esc_telefone_txt' })
  telefone: string;
  @Column({ length: 200, name: 'esc_endereco_txt' })
  endereco: string;
  @Column({ length: 2000, name: 'esc_logo_txt', nullable: true })
  logo: string;
  @Column({ length: 40, name: 'esc_inep_txt' })
  inep: string;
  @Column({ length: 12, name: 'esc_cep_txt' })
  cep: string;
  @Column({ length: 25, name: 'esc_cnpj_txt' })
  cnpj: string;
  @Column({ name: 'esc_dia_vencimento_int', default: 10 })
  dia_vencimento: number;
  @Column({ name: 'esc_valor_mensalidade_num', default: 1000, type: 'float4' })
  valor_mensalidade: number;
  @Column({ name: 'esc_desconto_assiduidade_num', type: 'float4', default: 0.05 })
  desconto_assiduidade: number;
  @Column({ name: 'esc_valor_juros_diario_num', type: 'float4', default: 0.05 })
  juros_diario: number;
  @Column({ length: 50, name: 'esc_nome_abreviado_txt' })
  nome_abreviado: string;
  @Column({ length: 2000, name: 'esc_assinatura_gestor_txt', nullable: true })
  assinatura_gestor: string;
  /* CHAVES ESTRANGEIRAS */
  @Column({ name: 'ree_id_int' })
  ree_id: number;
  @Column({ name: 'ren_id_int' })
  ren_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => RegiaoEscola, regiaoEscola => regiaoEscola.escolas)
  @JoinColumn({ name: "ree_id_int" })
  regiaoEscola: RegiaoEscola;
  @ManyToOne(type => RedeEnsino, redeEnsino => redeEnsino.escolas)
  @JoinColumn({ name: "ren_id_int" })
  redeEnsino: RedeEnsino;
  @OneToMany(type => DiretorEscola, diretorEscola => diretorEscola.diretor)
  diretoresEscolas: DiretorEscola[]
  @OneToMany(type => Turno, turno => turno.escola)
  turnos: Turno[];
  @OneToMany(type => Turma, turma => turma.escola)
  turmas: Turma[]
  @OneToMany(type => BoletoMensalidade, boletoMensalidade => boletoMensalidade.escola)
  boletosMensalidades: BoletoMensalidade[];
  @OneToMany(type => Estudante, estudante => estudante.escola)
  estudantes: Estudante[];
  @OneToMany(type => PerfilUsuario, perfilUsuario => perfilUsuario.escola)
  perfisUsuarios: PerfilUsuario[];
  @OneToMany(type => UsuarioEscola, usuarioEscola => usuarioEscola.escola)
  usuariosEscolas: UsuarioEscola[];
  @OneToMany(type => PedidoCartao, pedidoCartao => pedidoCartao.escola)
  pedidosCartoes: PedidoCartao[];
  @OneToMany(type => Portaria, portaria => portaria.escola)
  portarias: Portaria[];
  @OneToMany(type => SugestaoUsuario, sugestaoUsuario => sugestaoUsuario.escola)
  sugestoesUsuarios: SugestaoUsuario[];
  @OneToMany(type => EntradaPosteriorEstudante, entradaPosteriorEstudante => entradaPosteriorEstudante.escola)
  entradasPosterioresEstudantes: EntradaPosteriorEstudante[];
  @OneToMany(type => AlertaOcorrenciaVerificada, alertaOcorrenciaVerificada => alertaOcorrenciaVerificada.escola)
  alertasOcorrenciasVerificadas: AlertaOcorrenciaVerificada[];
  @OneToMany(type => RegraAlerta, regraAlerta => regraAlerta.escola)
  regrasAlertas: RegraAlerta[];
  @OneToMany(type => RegraAlertaUsuario, regraAlertaUsuario => regraAlertaUsuario.escola)
  regrasAlertasUsuarios: RegraAlertaUsuario[];
  @OneToMany(type => ProfessorEscola, professorEscola => professorEscola.escola)
  professoresEscolas: ProfessorEscola[];
  @OneToMany(type => ProfessorTurma, professorTurma => professorTurma.escola)
  professoresTurmas: ProfessorTurma[];
  @OneToMany(type => TipoOcorrenciaDisciplinar, tipoOcorrenciaDisciplinar => tipoOcorrenciaDisciplinar.escola)
  tiposOcorrenciasDisciplinares: TipoOcorrenciaDisciplinar[];
  @OneToMany(type => Mensao, mensao => mensao.escola)
  mensoes: Mensao[];


}
