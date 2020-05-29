import { ProfessorDisciplina } from './../professor-disciplina/professor-disciplina.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, Index } from "typeorm";
import { Turma } from '../turma/turma.entity';
import { Escola } from '../escola/escola.entity';

@Entity('professor_turma_prt')
export class ProfessorTurma extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'prt_id_int' })
  id: number;
  @Column({ name: 'prt_conselheiro_int' })
  conselheiro: boolean;
  @Column({ name: 'prd_id_int' })
  prd_id: number;
  @Column({ name: 'trm_id_int' })
  trm_id: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => ProfessorDisciplina, professorDisciplina => professorDisciplina.professoresTurmas)
  @JoinColumn({ name: 'prd_id_int' })
  professorDisciplina: ProfessorDisciplina;
  @ManyToOne(type => Turma, turma => turma.professoresTurmas)
  @JoinColumn({ name: 'trm_id_int' })
  turma: Turma;
  @ManyToOne(type => Escola, escola => escola.professoresTurmas)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;



}