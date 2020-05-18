import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Turno } from "../turno/turno.entity";
import { Portaria } from "../portaria/portaria.entity";

@Entity('turno_portaria_tup')
export class TurnoPortaria extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'tup_id_int' })
  id: number;
  @Column({ name: 'tup_toleracia_inicio', comment: 'Tolerancia em minutos' })
  tup_toleracia_inicio: number;
  @Column({ name: 'tup_toleracia_fim', comment: 'Tolerancia em minutos' })
  tup_toleracia_fim: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Turno, turno => turno.turnosPortaria, { eager: false })
  @JoinColumn({ name: 'trm_id_int' })
  turno: Turno;
  @ManyToOne(type => Portaria, portaria => portaria.turnosPortaria, { eager: false })
  @JoinColumn({ name: 'por_id_int' })
  portaria: Portaria;



}