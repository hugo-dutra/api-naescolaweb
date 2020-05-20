import { Disciplina } from './../disciplina/disciplina.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('resultado_boletim_reb')
export class ResultadoBoletim extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'reb_id_int' })
  id: number;
  @Column({ name: 'reb_nota_num', nullable: false })
  reb_nota: number;
  @Column({ name: 'reb_falta_int', nullable: false })
  reb_falta: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Disciplina, disciplina => disciplina.resultadosBoletins, { eager: false })
  @JoinColumn({ name: 'dsp_id_int' })
  disciplina: Disciplina;



}