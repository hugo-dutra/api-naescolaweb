import { DiarioAvaliacao } from './../diario-avaliacao/diario-avaliacao.entity';
import { RegistroDiario } from './../registro-diario/registro-diario.entity';
import { DiarioAvaliacaoDiagnostica } from './../diario-avaliacao-diagnostica/diario-avaliacao-diagnostica.entity';
import { DiarioObservacaoEstudante } from './../diario-observacao-estudante/diario-observacao-estudante.entity';
import { DiarioObservacoesGerais } from './../diario-observacoes-gerais/diario-observacoes-gerais.entity';
import { ProfessorDisciplina } from './../professor-disciplina/professor-disciplina.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Turma } from '../turma/turma.entity';

@Entity('diario_professor_dip')
export class DiarioProfessor extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'dip_id_int' })
  id: number;
  @Column({ name: 'dip_diario_txt', length: 200, nullable: false })
  dip_diario: string;
  @Column({ name: 'dip_criacao_dte', nullable: false })
  dip_criacao: Date;
  /* RELACIONAMENTOS */
  @ManyToOne(type => ProfessorDisciplina, professorDisciplina => professorDisciplina.diariosProfessores)
  @JoinColumn({ name: 'prd_id_int' })
  professorDisciplina: ProfessorDisciplina;
  @ManyToOne(type => Turma, turma => turma.diariosProfessores)
  @JoinColumn({ name: 'trm_id_int' })
  turma: Turma;
  @OneToMany(type => DiarioObservacoesGerais, diarioObservacoesGerais => diarioObservacoesGerais.diarioProfessor)
  diariosObservacoesGerais: DiarioObservacoesGerais[];
  @OneToMany(type => DiarioObservacaoEstudante, diarioObservacaoEstudante => diarioObservacaoEstudante.diarioProfessor)
  diariosObservacoesEstudantes: DiarioObservacaoEstudante[];
  @OneToMany(type => DiarioAvaliacaoDiagnostica, diarioAvaliacaoDiagnostica => diarioAvaliacaoDiagnostica.diarioProfessor)
  diariosAvaliacoesDiagnosticas: DiarioAvaliacaoDiagnostica[];
  @OneToMany(type => RegistroDiario, registroDiario => registroDiario.diarioProfessor)
  registrosDiarios: RegistroDiario[];
  @OneToMany(type => DiarioAvaliacao, diarioAvaliacao => diarioAvaliacao.diarioProfessor)
  diariosAvaliacoes: DiarioAvaliacao[];

}