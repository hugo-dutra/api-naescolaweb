import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Serie } from "../serie/serie.entity";
import { Disciplina } from "../disciplina/disciplina.entity";

@Entity('etapa_ensino_ete')
export class EtapaEnsino extends BaseEntity {
  /* COLUNAS */
  @PrimaryGeneratedColumn({ name: 'ete_id_int' })
  id: number
  @Column({ length: 500, name: 'ete_nome_txt', nullable: false })
  nome: string;
  @Column({ length: 50, name: 'ete_abreviatura_txt', nullable: false })
  abreviatura: string;
  /* RELACIONAMENTOS */
  @OneToMany(type => Serie, serie => serie.etapaEnsino)
  series: Serie[]
  @OneToMany(type => Disciplina, disciplina => disciplina.etapaEnsino)
  disciplinas: Disciplina[];



}
