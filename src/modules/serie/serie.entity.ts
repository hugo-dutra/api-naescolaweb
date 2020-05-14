import { EtapaEnsino } from './../etapa-ensino/etapa-ensino.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Turma } from '../turma/turma.entity';

@Entity('serie_sre')
export class Serie extends BaseEntity {
  /* COLUNAS */
  @PrimaryGeneratedColumn({ name: 'sre_id_int' })
  id: number;
  @Column({ length: 45, name: 'sre_nome_txt' })
  sre_nome: string;
  @Column({ length: 5, name: 'sre_abreviatura_txt' })
  sre_abreviatura: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => EtapaEnsino, etapaEnsino => etapaEnsino.series, { eager: false })
  @JoinColumn({ name: 'ete_id_int' })
  etapaEnsino: EtapaEnsino;
  @OneToMany(type => Turma, turma => turma.serie, { eager: true })
  turmas: Turma[]
}