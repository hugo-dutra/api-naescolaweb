import { EtapaEnsino } from './../etapa-ensino/etapa-ensino.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Turma } from '../turma/turma.entity';

@Entity('serie_sre')
export class Serie extends BaseEntity {
  /* COLUNAS */
  @PrimaryGeneratedColumn({ name: 'sre_id_int' })
  id: number;
  @Column({ length: 45, name: 'sre_nome_txt' })
  nome: string;
  @Column({ length: 5, name: 'sre_abreviatura_txt' })
  abreviatura: string;
  @Column({ name: 'ete_id_int' })
  ete_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => EtapaEnsino, etapaEnsino => etapaEnsino.series)
  @JoinColumn({ name: 'ete_id_int' })
  etapaEnsino: EtapaEnsino;
  @OneToMany(type => Turma, turma => turma.serie)
  turmas: Turma[]
}