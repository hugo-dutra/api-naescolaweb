import { Usuario } from './../usuario/usuario.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";

@Entity('saida_antecipada_eventual_sae')
export class SaidaAntecipadaEventual extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'sae_id_int' })
  id: number;
  @Column({ name: 'sae_data_dte', nullable: false, type: 'date' })
  data: Date;
  @Column({ name: 'sae_hora_tmr', nullable: false, type: 'time' })
  hora: Date;
  @Column({ name: 'sae_motivo_txt', length: 500, nullable: false })
  motivo: string;
  @Column({ name: 'est_id_int' })
  est_id: number;
  @Column({ name: 'usr_id_int' })
  usr_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Estudante, estudante => estudante.saidasAntecipadasEventuais)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => Usuario, usuario => usuario.saidasAntecipadasEventuais)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
}