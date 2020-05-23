import { DiarioProfessor } from './../diario-professor/diario-professor.entity';
import { ObservacaoTurma } from './../observacao-turma/observacao-turma.entity';
import { EstudanteTurma } from './../estudante-turma/estudante-turma.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Serie } from "../serie/serie.entity";
import { Turno } from "../turno/turno.entity";
import { Escola } from "../escola/escola.entity";
import { ProfessorTurma } from '../professor-turma/professor-turma.entity';

@Entity('turma_trm')
export class Turma extends BaseEntity {
  /* COLUNAS */
  @PrimaryGeneratedColumn({ name: 'trm_id_int' })
  id: number;
  @Column({ length: 50, name: 'trm_nome_txt', nullable: false })
  nome: string;
  @Column({ name: 'trm_ano_int' })
  ano: number;
  @Column({ name: 'sre_id_int' })
  sre_id: number;
  @Column({ name: 'trn_id_int' })
  trn_id: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Serie, serie => serie.turmas)
  @JoinColumn({ name: 'sre_id_int' })
  serie: Serie;
  @ManyToOne(type => Turno, turno => turno.turmas)
  @JoinColumn({ name: 'trn_id_int' })
  turno: Turno;
  @ManyToOne(type => Escola, escola => escola.turmas)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => EstudanteTurma, estudanteTurma => estudanteTurma.turma)
  estudantesTurmas: EstudanteTurma[];
  @OneToMany(type => ObservacaoTurma, observacaoTurma => observacaoTurma.turma)
  observacoesTurmas: ObservacaoTurma[];
  @OneToMany(type => ProfessorTurma, professorTurma => professorTurma.turma)
  professoresTurmas: ProfessorTurma[];
  @OneToMany(type => DiarioProfessor, diarioProfessor => diarioProfessor.turma)
  diariosProfessores: DiarioProfessor[];


}