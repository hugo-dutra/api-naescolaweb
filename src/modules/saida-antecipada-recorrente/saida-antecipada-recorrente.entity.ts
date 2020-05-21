import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity('saida_antecipada_recorrente_sar')
export class SaidaAntecipadaRecorrente extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'sar_id_int' })
  id: number;
  @Column({ name: 'sar_data_dte', nullable: false })
  sar_data: Date;
  @Column({ name: 'sar_hora_tmr', nullable: false })
  sar_hora: Date;
  @Column({ name: 'sar_motivo_txt', length: 500, nullable: false })
  sar_motivo: string;
  @Column({ name: 'sar_segunda_int' })
  sar_segunda: number;
  @Column({ name: 'sar_terca_int' })
  sar_terca: number;
  @Column({ name: 'sar_quarta_int' })
  sar_quarta: number;
  @Column({ name: 'sar_quinta_int' })
  sar_quinta: number;
  @Column({ name: 'sar_sexta_int' })
  sar_sexta: number;
  @Column({ name: 'sar_sabado_int' })
  sar_sabado: number;
  /* REPOSITORY */
  @ManyToOne(type => Estudante, estudante => estudante.saidasAntecipadasRecorrentes)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => Usuario, usuario => usuario.saidasAntecipadasRecorrentes)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;




}