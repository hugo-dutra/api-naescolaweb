import { EstudanteTurma } from './../estudante-turma/estudante-turma.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Serie } from "../serie/serie.entity";
import { Turno } from "../turno/turno.entity";
import { Escola } from "../escola/escola.entity";

@Entity('turma_trm')
export class Turma extends BaseEntity {
  /* COLUNAS */
  @PrimaryGeneratedColumn({ name: 'trm_id_int' })
  id: number;
  @Column({ length: 50, name: 'trm_nome_txt', nullable: false })
  trm_nome: string;
  @Column({ name: 'trm_ano_int' })
  trm_ano: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Serie, serie => serie.turmas, { eager: false })
  @JoinColumn({ name: 'sre_id_int' })
  serie: Serie;
  @ManyToOne(type => Turno, turno => turno.turmas, { eager: false })
  @JoinColumn({ name: 'trn_id_int' })
  turno: Turno;
  @ManyToOne(type => Escola, escola => escola.turmas, { eager: false })
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => EstudanteTurma, estudanteTurma => estudanteTurma.turma, { eager: true })
  estudantesTurmas: EstudanteTurma[]



}