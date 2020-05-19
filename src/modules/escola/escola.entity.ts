import { RegraAlertaUsuario } from './../regra-alerta-usuario/regra-alerta-usuario.entity';
import { RegraAlerta } from './../regra-alerta/regra-alerta.entity';
import { AlertaOcorrenciaVerificada } from './../alerta-ocorrencia-verificada/alerta-ocorrencia-verificada.entity';
import { SugestaoUsuario } from './../susgestao-usuario/sugestao-usuario.entity';
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
  @Column({ length: 200, name: 'esc_logo_txt' })
  logo: string;
  @Column({ length: 40, name: 'esc_inep_txt' })
  inep: string;
  @Column({ length: 12, name: 'esc_cep_txt' })
  cep: string;
  @Column({ length: 25, name: 'esc_cnpj_txt' })
  cnpj: string;
  @Column({ name: 'esc_dia_vencimento_int' })
  dia_vencimento: number;
  @Column({ name: 'esc_valor_mensalidade_num' })
  valor_mensalidade: number;
  @Column({ name: 'esc_desconto_assiduidade_num' })
  desconto_assiduidade: number;
  @Column({ name: 'esc_juros_diario_num' })
  juros_diario: number;
  @Column({ length: 50, name: 'esc_nome_abreviado_txt' })
  nome_abreviado: string;
  @Column({ length: 2000, name: 'esc_assinatura_gestor_txt' })
  assinatura_gestor: string;
  /* CHAVES ESTRANGEIRAS */
  @Column({ name: 'ree_id_int' })
  ree_id: number;
  @Column({ name: 'ren_id_int' })
  ren_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => RegiaoEscola, regiaoEscola => regiaoEscola.escolas, { eager: false })
  @JoinColumn({ name: "ree_id_int" })
  regiaoEscola: RegiaoEscola;
  @ManyToOne(type => RedeEnsino, redeEnsino => redeEnsino.escolas, { eager: false })
  @JoinColumn({ name: "ren_id_int" })
  redeEnsino: RedeEnsino;
  @OneToMany(type => DiretorEscola, diretorEscola => diretorEscola.diretor, { eager: true })
  diretoresEscolas: DiretorEscola[]
  @OneToMany(type => Turno, turno => turno.escola, { eager: true })
  turnos: Turno[];
  @OneToMany(type => Turma, turma => turma.escola, { eager: true })
  turmas: Turma[]
  @OneToMany(type => BoletoMensalidade, boletoMensalidade => boletoMensalidade.escola, { eager: true })
  boletosMensalidades: BoletoMensalidade[];
  @OneToMany(type => Estudante, estudante => estudante.escola, { eager: true })
  estudantes: Estudante[];
  @OneToMany(type => PerfilUsuario, perfilUsuario => perfilUsuario.escola, { eager: true })
  perfisUsuarios: PerfilUsuario[];
  @OneToMany(type => UsuarioEscola, usuarioEscola => usuarioEscola.escola, { eager: false })
  usuariosEscolas: UsuarioEscola[];
  @OneToMany(type => PedidoCartao, pedidoCartao => pedidoCartao.escola, { eager: true })
  pedidosCartoes: PedidoCartao[];
  @OneToMany(type => Portaria, portaria => portaria.escola, { eager: true })
  portarias: Portaria[];
  @OneToMany(type => SugestaoUsuario, sugestaoUsuario => sugestaoUsuario.escola, { eager: true })
  sugestoesUsuarios: SugestaoUsuario[];
  @OneToMany(type => EntradaPosteriorEstudante, entradaPosteriorEstudante => entradaPosteriorEstudante.escola, { eager: true })
  entradasPosterioresEstudantes: EntradaPosteriorEstudante[];
  @OneToMany(type => AlertaOcorrenciaVerificada, alertaOcorrenciaVerificada => alertaOcorrenciaVerificada.escola, { eager: true })
  alertasOcorrenciasVerificadas: AlertaOcorrenciaVerificada[];
  @OneToMany(type => RegraAlerta, regraAlerta => regraAlerta.escola, { eager: false })
  regrasAlertas: RegraAlerta[];
  @OneToMany(type => RegraAlertaUsuario, regraAlertaUsuario => regraAlertaUsuario.escola, { eager: true })
  regrasAlertasUsuarios: RegraAlertaUsuario[];
}
