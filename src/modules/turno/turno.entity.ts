import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Escola } from "../escola/escola.entity";
import { Turma } from "../turma/turma.entity";
import { TurnoPortaria } from "../turno-portaria/turno-portaria.entity";

@Entity('turno_trn')
export class Turno extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'trm_id_int' })
  id: number;
  @Column({ length: 45, name: 'trn_nome_txt' })
  trn_nome: string;
  @Column({ name: 'trn_hora_inicio_tmr' })
  trn_hora_inicio: string;
  @Column({ name: 'trn_hora_fim_tmr' })
  trn_hora_fim: string;
  @Column({ length: 5, name: 'trn_abreviatura_txt' })
  trn_abreviatura: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Escola, escola => escola.turnos, { eager: false })
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => Turma, turma => turma.turno, { eager: true })
  turmas: Turma[]
  @OneToMany(type => TurnoPortaria, turnoPortaria => turnoPortaria.turno, { eager: true })
  turnosPortaria: TurnoPortaria[];


}