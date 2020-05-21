import { ProfessorDisciplina } from './../professor-disciplina/professor-disciplina.entity';
import { ProfessorEscola } from './../professor-escola/professor-escola.entity';
import { UsuarioProfessor } from './../usuario-professor/usuario-professor.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('professor_prf')
export class Professor extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'prf_id_int' })
  id: number;
  @Column({ name: 'prf_nome_txt', nullable: false, length: 200 })
  prf_nome: string;
  @Column({ name: 'prf_email_txt', length: 150 })
  prf_email: string;
  @Column({ name: 'prf_matricula_txt', length: 20 })
  prf_matricula: string;
  @Column({ name: 'prf_cpf_txt', length: 20 })
  prf_cpf: string;
  @Column({ name: 'prf_telefone_txt', length: 20 })
  prf_telefone: string;
  /* RELACIONAMENTOS */
  @OneToMany(type => UsuarioProfessor, usuarioProfessor => usuarioProfessor.usuario)
  usuariosProfessores: UsuarioProfessor[];
  @OneToMany(type => ProfessorEscola, professorEscola => professorEscola.professor)
  professoresEscolas: ProfessorEscola[];
  @OneToMany(type => ProfessorDisciplina, professorDisciplina => professorDisciplina.professor)
  professoresDisciplinas: ProfessorDisciplina[];
}