import { Usuario } from './../usuario/usuario.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";
import { Escola } from "../escola/escola.entity";

@Entity('entrada_posterior_estudante_epe')
export class EntradaPosteriorEstudante extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'epe_id_int' })
  id: number;
  @Column({ name: 'epe_data_dte', nullable: false })
  epe_data: Date;
  @Column({ name: 'epe_hora_tmr', nullable: false })
  epe_hora: Date;
  @Column({ name: 'epe_motivo_txt', nullable: false, length: 500 })
  epe_motivo: string;
  @Column({ name: 'epe_segunda_int', default: 0 })
  epe_segunda: number;
  @Column({ name: 'epe_terca_int', default: 0 })
  epe_terca: number;
  @Column({ name: 'epe_quarta_int', default: 0 })
  epe_quarta: number;
  @Column({ name: 'epe_quinta_int', default: 0 })
  epe_quinta: number;
  @Column({ name: 'epe_sexta_int', default: 0 })
  epe_sexta: number;
  @Column({ name: 'epe_sabado_int', default: 0 })
  epe_sabado: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Usuario, usuario => usuario.entradasPosterioresEstudantes, { eager: false })
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Estudante, estudante => estudante.entradasPosterioresEstudantes, { eager: false })
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => Escola, escola => escola.entradasPosterioresEstudantes, { eager: false })
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;


}