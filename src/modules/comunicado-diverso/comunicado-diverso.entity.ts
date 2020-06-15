import { StatusEntregaMensagem } from './../status-entrega-mensagem/status-entrega-mensagem.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";
import { Usuario } from "../usuario/usuario.entity";


@Entity('comunicado_diverso_cdi')
export class ComunicadoDiverso extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'cdi_id_int' })
  id: number;
  @Column({ name: 'cdi_assunto_txt', length: 50, nullable: false })
  assunto: string;
  @Column({ name: 'cdi_mensagem_txt', length: 1000, nullable: false })
  mensagem: string;
  @Column({ name: 'cdi_data_dte' })
  data: Date;
  @Column({ name: 'cdi_hora_tmr' })
  hora: Date;
  @Column({ name: 'cdi_fbdbkey_txt', length: 50 })
  fbdbkey: string;
  @Column({ name: 'est_id_int' })
  est_id: number;
  @Column({ name: 'usr_id_int' })
  usr_id: number;
  @Column({ name: 'cdi_status_int' })
  cdi_status: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Estudante, estudante => estudante.comunicadosDiversos)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => Usuario, usuario => usuario.comunicadosDiversos)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => StatusEntregaMensagem, statusEntregaMensagem => statusEntregaMensagem.comunicadosDiversos)
  @JoinColumn({ name: 'cdi_status_int' })
  statusEntregaMensagem: StatusEntregaMensagem;

}