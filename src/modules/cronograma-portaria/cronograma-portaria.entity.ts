import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Portaria } from "../portaria/portaria.entity";

@Entity('cronograma_portaria_crp')
export class CronogramaPortaria extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'crp_id_int' })
  id: number;
  @Column({ name: 'crp_horario_inicio_tmr' })
  crp_horario_inicio: Date;
  @Column({ name: 'crp_horario_fim_tmr' })
  crp_horario_fim: Date;
  @Column({ name: 'crp_modo_portaria_txt', length: 45, nullable: false })
  crp_modo_portaria: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Portaria, portaria => portaria.cronogramasPortaria)
  @JoinColumn({ name: 'por_id_int' })
  portaria: Portaria;
}