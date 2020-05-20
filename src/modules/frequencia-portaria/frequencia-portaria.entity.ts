import { StatusEntregaMensagem } from './../status-entrega-mensagem/status-entrega-mensagem.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Portaria } from "../portaria/portaria.entity";
import { Estudante } from "../estudante/estudante.entity";

@Entity('frequencia_portaria_frp')
export class FrequenciaPortaria extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'frp_id_int' })
  id: number;
  @Column({ name: 'frp_data_dtm' })
  frp_data: Date;
  @Column({ name: 'frp_hora_tmr' })
  frp_hora: Date;
  @Column({ name: 'frp_tipo_movimentacao' })
  frm_tipo_movimentacao: number;
  @Column({ name: 'frp_firebase_db_key_txt', length: 50 })
  frp_firebase_db_key: string;
  @Column({ name: 'frp_firebase_admin_db_key_txt', length: 50 })
  frp_firebase_admin_db_key: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Portaria, portaria => portaria.frequenciasPortarias, { eager: false })
  @JoinColumn({ name: 'por_id_int' })
  portaria: Portaria;
  @ManyToOne(type => Estudante, estudante => estudante.frequenciasPortarias, { eager: false })
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => StatusEntregaMensagem, statusEntregaMensagem => statusEntregaMensagem.frequenciasPortarias, { eager: false })
  @JoinColumn({ name: 'frp_status_entrega_int' })
  statusEntregaMensagem: StatusEntregaMensagem;

}