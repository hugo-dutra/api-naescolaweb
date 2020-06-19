import { BoletimEscolar } from './../boletim-escolar/boletim-escolar.entity';
import { PeriodoLetivo } from './../periodo-letivo/periodo-letivo.entity';
import { Disciplina } from './../disciplina/disciplina.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('resultado_boletim_reb')
export class ResultadoBoletim extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'reb_id_int' })
  id: number;
  @Column({ name: 'reb_nota_num', nullable: false, type: 'float4' })
  nota: number;
  @Column({ name: 'reb_falta_int', nullable: false })
  falta: number;
  @Column({ name: 'dsp_id_int', nullable: false })
  dsp_id: number;
  @Column({ name: 'prl_id_int', nullable: false })
  prl_id: number;
  @Column({ name: 'bes_id_int', nullable: false })
  bes_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Disciplina, disciplina => disciplina.resultadosBoletins)
  @JoinColumn({ name: 'dsp_id_int' })
  disciplina: Disciplina;
  @ManyToOne(type => PeriodoLetivo, periodoLetivo => periodoLetivo.resultadosBoletins)
  @JoinColumn({ name: 'prl_id_int' })
  periodoLetivo: PeriodoLetivo;
  @ManyToOne(type => BoletimEscolar, boletimEscolar => boletimEscolar.resultadosBoletins)
  @JoinColumn({ name: 'bes_id_int' })
  boletimEscolar: BoletimEscolar;



}