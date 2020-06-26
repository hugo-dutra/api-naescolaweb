import { StatusEntregaMensagem } from './../status-entrega-mensagem/status-entrega-mensagem.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Portaria } from "../portaria/portaria.entity";
import { Estudante } from "../estudante/estudante.entity";

@Entity('frequencia_portaria_frp')
export class FrequenciaPortaria extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'frp_id_int' })
  id: number;
  @Column({ name: 'frp_data_dtm', type: 'date' })
  data: Date;
  @Column({ name: 'frp_hora_tmr', type: 'time' })
  hora: Date;
  @Column({ name: 'frp_tipo_movimentacao' })
  tipo_movimentacao: number;
  @Column({ name: 'frp_firebase_db_key_txt', length: 50, nullable: true })
  firebase_db_key: string;
  @Column({ name: 'frp_firebase_admin_db_key_txt', length: 50, nullable: true })
  firebase_admin_db_key: string;
  @Column({ name: 'por_id_int' })
  por_id: number;
  @Column({ name: 'est_id_int' })
  est_id: number;
  @Column({ name: 'frp_status_entrega_int', default: 0 })
  status_entrega: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Portaria, portaria => portaria.frequenciasPortarias)
  @JoinColumn({ name: 'por_id_int' })
  portaria: Portaria;
  @ManyToOne(type => Estudante, estudante => estudante.frequenciasPortarias)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => StatusEntregaMensagem, statusEntregaMensagem => statusEntregaMensagem.frequenciasPortarias)
  @JoinColumn({ name: 'frp_status_entrega_int' })
  statusEntregaMensagem: StatusEntregaMensagem;

}