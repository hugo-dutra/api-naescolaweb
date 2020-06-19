import { AvaliacaoEstudante } from './../avaliacao-estudante/avaliacao-estudante.entity';
import { PeriodoLetivo } from './../periodo-letivo/periodo-letivo.entity';
import { DiarioProfessor } from './../diario-professor/diario-professor.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('diario_avaliacao_dav')
export class DiarioAvaliacao extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'dav_id_int' })
  id: number;
  @Column({ name: 'dav_metodologia_txt', length: 250, nullable: false })
  metodologia: string;
  @Column({ name: 'dav_objetivo_txt', length: 250, nullable: false })
  objetivo: string;
  @Column({ name: 'dav_data_dte', nullable: false })
  data: Date;
  @Column({ name: 'dav_valor_num', nullable: false, type: 'float4' })
  valor: number;
  @Column({ name: 'dav_peso_num', nullable: false, type: 'float4' })
  peso: number;
  @Column({ name: 'dip_id_int', nullable: false })
  dip_id: number;
  @Column({ name: 'prl_id_int', nullable: false })
  prl_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => DiarioProfessor, diarioProfessor => diarioProfessor.diariosAvaliacoes)
  @JoinColumn({ name: 'dip_id_int' })
  diarioProfessor: DiarioProfessor;
  @ManyToOne(type => PeriodoLetivo, periodoLetivo => periodoLetivo.diariosAvaliacoes)
  @JoinColumn({ name: 'prl_id_int' })
  periodoLetivo: PeriodoLetivo;
  @OneToMany(type => AvaliacaoEstudante, avaliacaoEstudante => avaliacaoEstudante.diarioAvaliacao)
  avaliacoesEstudantes: AvaliacaoEstudante[];
}