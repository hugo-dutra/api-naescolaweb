import { AvaliacaoEstudante } from './../avaliacao-estudante/avaliacao-estudante.entity';
import { BoletimEscolar } from './../boletim-escolar/boletim-escolar.entity';
import { FrequenciaPortaria } from './../frequencia-portaria/frequencia-portaria.entity';
import { ComunicadoDiverso } from './../comunicado-diverso/comunicado-diverso.entity';
import { RegistroFrequencia } from './../registro-frequencia/registro-frequencia.entity';
import { DiarioAvaliacaoDiagnostica } from './../diario-avaliacao-diagnostica/diario-avaliacao-diagnostica.entity';
import { DiarioObservacaoEstudante } from './../diario-observacao-estudante/diario-observacao-estudante.entity';
import { SaidaAntecipadaRecorrente } from './../saida-antecipada-recorrente/saida-antecipada-recorrente.entity';
import { OcorrenciaDisciplinar } from './../ocorrencia-disciplinar/ocorrencia-disciplinar.entity';
import { SaidaAntecipadaEventual } from './../saida-antecipada-eventual/saida-antecipada-eventual.entity';
import { AtividadeExtraEstudante } from './../atividade-extra-estudante/atividade-extra-estudante.entity';
import { PendenciaCarteirinha } from './../pendencia-carteirinha/pendencia-carteirinha.entity';
import { AtestadoMedico } from './../atestado-medico/atestado-medico.entity';
import { ObservacaoEstudante } from './../observacao-estudante/observacao-estudante.entity';
import { CartaoPedido } from './../cartao-pedido/cartao-pedido.entity';
import { TelefoneContatoEstudante } from './../telefone-contato-estudante/telefone-contato-estudante.entity';
import { EstudanteTurma } from './../estudante-turma/estudante-turma.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Escola } from "../escola/escola.entity";
import { EntradaPosteriorEstudante } from '../entrada-posterior-estudante/entrada-posterior-estudante.entity';

@Entity('estudante_est')
export class Estudante extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'est_id_int' })
  id: number;
  @Column({ length: 250, name: 'est_nome_txt', nullable: false })
  est_nome: string;
  @Column({ length: 50, name: 'est_matricula_txt', nullable: false })
  est_matricula: string;
  @Column({ length: 250, name: 'est_pai_txt' })
  est_pai: string;
  @Column({ length: 250, name: 'est_mae_txt' })
  est_mae: string;
  @Column({ length: 250, name: 'est_responsavel_txt' })
  est_responsavel: string;
  @Column({ length: 250, name: 'est_email_txt' })
  est_email: string;
  @Column({ length: 500, name: 'est_endereco_txt' })
  est_endereco: string;
  @Column({ length: 5, name: 'est_tipo_sanguineo_txt' })
  est_tipo_sanguineo: string;
  @Column({ name: 'est_envio_msg_status_int', default: 1 })
  est_envio_msg_status: number;
  @Column({ name: 'est_envio_ativo_int', default: 1 })
  est_envio_ativo: number;
  @Column({ name: 'est_nascimento_dte' })
  est_nascimento: Date;
  @Column({ name: 'est_foto_txt', length: 500 })
  est_foto: string;
  @Column({ name: 'est_cep_txt', length: 12 })
  est_cep: string;
  @Column({ name: 'est_data_foto_dtm' })
  est_data_foto: Date;
  @Column({ name: 'usr_id_foto_int' }) // Depois, transformar isso num relacionamento
  usr_id_foto: number;;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Escola, escola => escola.estudantes, { eager: false })
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => EstudanteTurma, estudanteTurma => estudanteTurma.estudante, { eager: true })
  estudantesTurmas: EstudanteTurma[];
  @OneToMany(type => TelefoneContatoEstudante, telefoneContatoEstudante => telefoneContatoEstudante.estudante, { eager: true })
  telefonesContatoEstudantes: TelefoneContatoEstudante[]
  @OneToMany(type => CartaoPedido, cartaoPedido => cartaoPedido.estudante, { eager: true })
  cartoesPedidos: CartaoPedido[];
  @OneToMany(type => ObservacaoEstudante, observacaoEstudante => observacaoEstudante.estudante, { eager: true })
  observacoesEstudantes: ObservacaoEstudante[];
  @OneToMany(type => AtestadoMedico, atestadoMedico => atestadoMedico.estudante, { eager: true })
  atestadosMedicos: AtestadoMedico[];
  @OneToMany(type => PendenciaCarteirinha, pendenciaCarteirinha => pendenciaCarteirinha.estudante, { eager: true })
  pendenciasCarteirinhas: PendenciaCarteirinha[];
  @OneToMany(type => AtividadeExtraEstudante, atividadeExtraEstudante => atividadeExtraEstudante.estudante, { eager: true })
  atividadesExtraEstudante: AtividadeExtraEstudante[];
  @OneToMany(type => SaidaAntecipadaEventual, saidaAntecipadaEventual => saidaAntecipadaEventual.estudante, { eager: true })
  saidasAntecipadasEventuais: SaidaAntecipadaEventual[];
  @OneToMany(type => EntradaPosteriorEstudante, entradaPosteriorEstudante => entradaPosteriorEstudante.estudante, { eager: true })
  entradasPosterioresEstudantes: EntradaPosteriorEstudante[];
  @OneToMany(type => OcorrenciaDisciplinar, ocorrenciaDisciplinar => ocorrenciaDisciplinar.estudante, { eager: true })
  ocorrenciasDisciplinares: OcorrenciaDisciplinar[];
  @OneToMany(type => SaidaAntecipadaRecorrente, saidaAntecipadaREcorrente => saidaAntecipadaREcorrente.estudante, { eager: true })
  saidasAntecipadasRecorrentes: SaidaAntecipadaRecorrente[];
  @OneToMany(type => DiarioObservacaoEstudante, diarioObservacaoEstudante => diarioObservacaoEstudante.estudante, { eager: true })
  diariosObservacoesEstudantes: DiarioObservacaoEstudante[]
  @OneToMany(type => DiarioAvaliacaoDiagnostica, diarioAvaliacaoDiagnostica => diarioAvaliacaoDiagnostica.estudante, { eager: true })
  diariosAvaliacoesDiagnosticas: DiarioAvaliacaoDiagnostica[];
  @OneToMany(type => RegistroFrequencia, registroFrequencia => registroFrequencia.estudante, { eager: true })
  registrosFrequencias: RegistroFrequencia[];
  @OneToMany(type => ComunicadoDiverso, comunicadoDiverso => comunicadoDiverso.estudante, { eager: true })
  comunicadosDiversos: ComunicadoDiverso[];
  @OneToMany(type => FrequenciaPortaria, frequenciaPortaria => frequenciaPortaria.estudante, { eager: true })
  frequenciasPortarias: FrequenciaPortaria[];
  @OneToMany(type => BoletimEscolar, boletimEscolar => boletimEscolar.estudante, { eager: true })
  boletinsEscolares: BoletimEscolar[];
  @OneToMany(type => AvaliacaoEstudante, avaliacaoEstudante => avaliacaoEstudante.estudante, { eager: true })
  avaliacoesEstudantes: AvaliacaoEstudante[];

}