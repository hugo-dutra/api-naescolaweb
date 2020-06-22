import { Usuario } from './../usuario/usuario.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";
import { Escola } from "../escola/escola.entity";

@Entity('entrada_posterior_estudante_epe')
export class EntradaPosteriorEstudante extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'epe_id_int' })
  id: number;
  @Column({ name: 'epe_data_dte', nullable: false, type: 'date' })
  data: Date;
  @Column({ name: 'epe_hora_tmr', nullable: false, type: 'time' })
  hora: Date;
  @Column({ name: 'epe_motivo_txt', nullable: false, length: 500 })
  motivo: string;
  @Column({ name: 'epe_segunda_int', default: 0 })
  segunda: number;
  @Column({ name: 'epe_terca_int', default: 0 })
  terca: number;
  @Column({ name: 'epe_quarta_int', default: 0 })
  quarta: number;
  @Column({ name: 'epe_quinta_int', default: 0 })
  quinta: number;
  @Column({ name: 'epe_sexta_int', default: 0 })
  sexta: number;
  @Column({ name: 'epe_sabado_int', default: 0 })
  sabado: number;
  @Column({ name: 'usr_id_int', default: 0 })
  usr_id: number;
  @Column({ name: 'est_id_int', default: 0 })
  est_id: number;
  @Column({ name: 'esc_id_int', default: 0 })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Usuario, usuario => usuario.entradasPosterioresEstudantes)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Estudante, estudante => estudante.entradasPosterioresEstudantes)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => Escola, escola => escola.entradasPosterioresEstudantes)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;


}