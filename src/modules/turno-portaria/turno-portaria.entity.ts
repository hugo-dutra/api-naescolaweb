import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Turno } from "../turno/turno.entity";
import { Portaria } from "../portaria/portaria.entity";

@Entity('turno_portaria_tup')
export class TurnoPortaria extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'tup_id_int' })
  id: number;
  @Column({ name: 'tup_tolerancia_inicio', comment: 'Tolerancia em minutos' })
  toleracia_inicio: number;
  @Column({ name: 'tup_tolerancia_fim', comment: 'Tolerancia em minutos' })
  toleracia_fim: number;
  @Column({ name: 'trn_id_int' })
  trn_id: number;
  @Column({ name: 'por_id_int' })
  por_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Turno, turno => turno.turnosPortaria)
  @JoinColumn({ name: 'trn_id_int' })
  turno: Turno;
  @ManyToOne(type => Portaria, portaria => portaria.turnosPortaria)
  @JoinColumn({ name: 'por_id_int' })
  portaria: Portaria;



}