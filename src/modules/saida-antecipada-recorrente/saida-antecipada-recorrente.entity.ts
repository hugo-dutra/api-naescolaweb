import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity('saida_antecipada_recorrente_sar')
export class SaidaAntecipadaRecorrente extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'sar_id_int' })
  id: number;
  @Column({ name: 'sar_data_dte', nullable: false, type: 'date' })
  data: Date;
  @Column({ name: 'sar_hora_tmr', nullable: false, type: 'time' })
  hora: Date;
  @Column({ name: 'sar_motivo_txt', length: 500, nullable: false })
  motivo: string;
  @Column({ name: 'sar_segunda_int' })
  segunda: number;
  @Column({ name: 'sar_terca_int' })
  terca: number;
  @Column({ name: 'sar_quarta_int' })
  quarta: number;
  @Column({ name: 'sar_quinta_int' })
  quinta: number;
  @Column({ name: 'sar_sexta_int' })
  sexta: number;
  @Column({ name: 'sar_sabado_int' })
  sabado: number;
  @Column({ name: 'est_id_int' })
  est_id: number;
  @Column({ name: 'usr_id_int' })
  usr_id: number;
  /* REPOSITORY */
  @ManyToOne(type => Estudante, estudante => estudante.saidasAntecipadasRecorrentes)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => Usuario, usuario => usuario.saidasAntecipadasRecorrentes)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;




}