import { DiarioProfessor } from './../diario-professor/diario-professor.entity';
import { AtividadeExtraClasse } from './../atividade-extra-classe/atividade-extra-classe.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Professor } from "../professor/professor.entity";
import { ProfessorTurma } from "../professor-turma/professor-turma.entity";
import { Disciplina } from '../disciplina/disciplina.entity';

@Entity('professor_disciplina_prd')
export class ProfessorDisciplina extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'prd_id_int' })
  id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Professor, professor => professor.professoresDisciplinas, { eager: false })
  @JoinColumn({ name: 'prf_id_int' })
  professor: Professor;
  @ManyToOne(type => Disciplina, disciplina => disciplina.professoresDisciplinas, { eager: false })
  @JoinColumn({ name: 'dsp_id_int' })
  disciplina: Disciplina;
  @OneToMany(type => ProfessorTurma, professorTurma => professorTurma.professorDisciplina, { eager: true })
  professoresTurmas: ProfessorTurma[];
  @OneToMany(type => AtividadeExtraClasse, atividadeExtraClasse => atividadeExtraClasse.professorDisciplina, { eager: true })
  atividadesExtraClasse: AtividadeExtraClasse[];
  @OneToMany(type => DiarioProfessor, diariosProfessores => diariosProfessores.professorDisciplina, { eager: true })
  diariosProfessores: DiarioProfessor[];



}