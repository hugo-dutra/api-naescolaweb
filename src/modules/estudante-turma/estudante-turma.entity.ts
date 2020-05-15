import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";
import { Turma } from "../turma/turma.entity";

@Entity('estudante_turma_etu')
export class EstudanteTurma extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'etu_id_int' })
  id: number;
  @Column({ name: 'etu_numero_chamada_int', default: 0 })
  etu_numero_chamada: number;
  @Column({ name: 'etu_turma_atual_int', default: 1 })
  etu_turma_atual: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Estudante, estudante => estudante.estudantesTurmas, { eager: false })
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => Turma, turma => turma.estudantesTurmas, { eager: false })
  @JoinColumn({ name: 'trm_id_int' })
  turma: Turma;

}