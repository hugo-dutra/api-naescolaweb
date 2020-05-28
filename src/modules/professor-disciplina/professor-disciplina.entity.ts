import { DiarioProfessor } from './../diario-professor/diario-professor.entity';
import { AtividadeExtraClasse } from './../atividade-extra-classe/atividade-extra-classe.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Column } from "typeorm";
import { Professor } from "../professor/professor.entity";
import { ProfessorTurma } from "../professor-turma/professor-turma.entity";
import { Disciplina } from '../disciplina/disciplina.entity';

@Entity('professor_disciplina_prd')
export class ProfessorDisciplina extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'prd_id_int' })
  id: number;
  @Column({ name: 'prf_id_int' })
  prf_id: number;
  @Column({ name: 'dsp_id_int' })
  dsp_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Professor, professor => professor.professoresDisciplinas)
  @JoinColumn({ name: 'prf_id_int' })
  professor: Professor;
  @ManyToOne(type => Disciplina, disciplina => disciplina.professoresDisciplinas)
  @JoinColumn({ name: 'dsp_id_int' })
  disciplina: Disciplina;
  @OneToMany(type => ProfessorTurma, professorTurma => professorTurma.professorDisciplina)
  professoresTurmas: ProfessorTurma[];
  @OneToMany(type => AtividadeExtraClasse, atividadeExtraClasse => atividadeExtraClasse.professorDisciplina)
  atividadesExtraClasse: AtividadeExtraClasse[];
  @OneToMany(type => DiarioProfessor, diariosProfessores => diariosProfessores.professorDisciplina)
  diariosProfessores: DiarioProfessor[];



}