import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity('atestado-medico-atm')
export class AtestadoMedico extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'atm_id_int' })
  id: number;
  @Column({ name: 'atm_codigo_cid_txt', length: 50, nullable: false })
  atm_codigo_cid: string;
  @Column({ name: 'atm_descricao_cid_txt', length: 500, nullable: false })
  atm_descricao_cid: string;
  @Column({ name: 'atm_data_inicio_dtm', nullable: false })
  atm_data_inicio: Date;
  @Column({ name: 'atm_data_fim_dtm', nullable: false })
  atm_data_fim: Date;
  @Column({ name: 'atm_quantidade_dias_letivos_int', nullable: false })
  atm_quantidade_dias_letivos: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Estudante, estudante => estudante.atestadosMedicos)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => Usuario, usuario => usuario.atestadosMedicos)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
}