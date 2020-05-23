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
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
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
  @Column({ length: 250, name: 'est_pai_txt', nullable: true })
  est_pai: string;
  @Column({ length: 250, name: 'est_mae_txt', nullable: true })
  est_mae: string;
  @Column({ length: 250, name: 'est_responsavel_txt', nullable: true })
  est_responsavel: string;
  @Column({ length: 250, name: 'est_email_txt', nullable: true })
  est_email: string;
  @Column({ length: 500, name: 'est_endereco_txt', nullable: true })
  est_endereco: string;
  @Column({ length: 5, name: 'est_tipo_sanguineo_txt', nullable: true })
  est_tipo_sanguineo: string;
  @Column({ name: 'est_envio_msg_status_int', default: 1 })
  est_envio_msg_status: number;
  @Column({ name: 'est_status_ativo_int', default: 1 })
  est_status_ativo: number;
  @Column({ name: 'est_nascimento_dte' })
  est_nascimento: Date;
  @Column({ name: 'est_foto_txt', length: 500, nullable: true })
  est_foto: string;
  @Column({ name: 'est_cep_txt', length: 20, nullable: true })
  est_cep: string;
  @Column({ name: 'est_data_foto_dtm', nullable: true })
  est_data_foto: Date;
  @Column({ name: 'usr_id_foto_int', nullable: true }) // Depois, transformar isso num relacionamento
  usr_id_foto: number;
  @Column({ name: 'esc_id_int', nullable: false })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Escola, escola => escola.estudantes)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => EstudanteTurma, estudanteTurma => estudanteTurma.estudante)
  estudantesTurmas: EstudanteTurma[];
  @OneToMany(type => TelefoneContatoEstudante, telefoneContatoEstudante => telefoneContatoEstudante.estudante)
  telefonesContatoEstudantes: TelefoneContatoEstudante[]
  @OneToMany(type => CartaoPedido, cartaoPedido => cartaoPedido.estudante)
  cartoesPedidos: CartaoPedido[];
  @OneToMany(type => ObservacaoEstudante, observacaoEstudante => observacaoEstudante.estudante)
  observacoesEstudantes: ObservacaoEstudante[];
  @OneToMany(type => AtestadoMedico, atestadoMedico => atestadoMedico.estudante)
  atestadosMedicos: AtestadoMedico[];
  @OneToMany(type => PendenciaCarteirinha, pendenciaCarteirinha => pendenciaCarteirinha.estudante)
  pendenciasCarteirinhas: PendenciaCarteirinha[];
  @OneToMany(type => AtividadeExtraEstudante, atividadeExtraEstudante => atividadeExtraEstudante.estudante)
  atividadesExtraEstudante: AtividadeExtraEstudante[];
  @OneToMany(type => SaidaAntecipadaEventual, saidaAntecipadaEventual => saidaAntecipadaEventual.estudante)
  saidasAntecipadasEventuais: SaidaAntecipadaEventual[];
  @OneToMany(type => EntradaPosteriorEstudante, entradaPosteriorEstudante => entradaPosteriorEstudante.estudante)
  entradasPosterioresEstudantes: EntradaPosteriorEstudante[];
  @OneToMany(type => OcorrenciaDisciplinar, ocorrenciaDisciplinar => ocorrenciaDisciplinar.estudante)
  ocorrenciasDisciplinares: OcorrenciaDisciplinar[];
  @OneToMany(type => SaidaAntecipadaRecorrente, saidaAntecipadaREcorrente => saidaAntecipadaREcorrente.estudante)
  saidasAntecipadasRecorrentes: SaidaAntecipadaRecorrente[];
  @OneToMany(type => DiarioObservacaoEstudante, diarioObservacaoEstudante => diarioObservacaoEstudante.estudante)
  diariosObservacoesEstudantes: DiarioObservacaoEstudante[]
  @OneToMany(type => DiarioAvaliacaoDiagnostica, diarioAvaliacaoDiagnostica => diarioAvaliacaoDiagnostica.estudante)
  diariosAvaliacoesDiagnosticas: DiarioAvaliacaoDiagnostica[];
  @OneToMany(type => RegistroFrequencia, registroFrequencia => registroFrequencia.estudante)
  registrosFrequencias: RegistroFrequencia[];
  @OneToMany(type => ComunicadoDiverso, comunicadoDiverso => comunicadoDiverso.estudante)
  comunicadosDiversos: ComunicadoDiverso[];
  @OneToMany(type => FrequenciaPortaria, frequenciaPortaria => frequenciaPortaria.estudante)
  frequenciasPortarias: FrequenciaPortaria[];
  @OneToMany(type => BoletimEscolar, boletimEscolar => boletimEscolar.estudante)
  boletinsEscolares: BoletimEscolar[];
  @OneToMany(type => AvaliacaoEstudante, avaliacaoEstudante => avaliacaoEstudante.estudante)
  avaliacoesEstudantes: AvaliacaoEstudante[];

}