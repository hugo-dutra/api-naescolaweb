import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";
import { Turma } from "../turma/turma.entity";

@Entity('estudante_turma_etu')
export class EstudanteTurma extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'etu_id_int' })
  id: number;
  @Column({ name: 'etu_numero_chamada_int', default: 0 })
  numero_chamada: number;
  @Column({ name: 'etu_turma_atual_int', default: 1 })
  turma_atual: number;
  @Column({ name: 'est_id_int' })
  est_id: number;
  @Column({ name: 'trm_id_int' })
  trm_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Estudante, estudante => estudante.estudantesTurmas)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => Turma, turma => turma.estudantesTurmas)
  @JoinColumn({ name: 'trm_id_int' })
  turma: Turma;

}