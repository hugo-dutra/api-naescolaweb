import { RegistroDiario } from './../registro-diario/registro-diario.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from '../estudante/estudante.entity';

@Entity('registro_frequencia_ref')
export class RegistroFrequencia extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'ref_id_int' })
  id: number;
  @Column({ name: 'ref_data_hora_dtm', nullable: false })
  data_hora: Date;
  @Column({ name: 'ref_presente_int', default: 1, nullable: false })
  presente: number;
  @Column({ name: 'ref_status_push_int', default: 0, nullable: false })
  status_push: number;
  @Column({ name: 'rdi_id_int', nullable: false })
  rdi_id: number;
  @Column({ name: 'est_id_int', nullable: false })
  est_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => RegistroDiario, registroDiario => registroDiario.registrosFrequencias)
  @JoinColumn({ name: 'rdi_id_int' })
  registroDiario: RegistroDiario;
  @ManyToOne(type => Estudante, estudante => estudante.registrosFrequencias)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
}