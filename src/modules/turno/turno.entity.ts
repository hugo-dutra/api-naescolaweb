import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Escola } from "../escola/escola.entity";
import { Turma } from "../turma/turma.entity";
import { TurnoPortaria } from "../turno-portaria/turno-portaria.entity";

@Entity('turno_trn')
export class Turno extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'trn_id_int' })
  id: number;
  @Column({ length: 45, name: 'trn_nome_txt' })
  nome: string;
  @Column({ name: 'trn_hora_inicio_tmr' })
  horaInicio: string;
  @Column({ name: 'trn_hora_fim_tmr' })
  horaFim: string;
  @Column({ length: 5, name: 'trn_abreviatura_txt' })
  abreviatura: string;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Escola, escola => escola.turnos)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => Turma, turma => turma.turno)
  turmas: Turma[]
  @OneToMany(type => TurnoPortaria, turnoPortaria => turnoPortaria.turno)
  turnosPortaria: TurnoPortaria[];


}