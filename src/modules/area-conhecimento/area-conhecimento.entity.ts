import { Disciplina } from './../disciplina/disciplina.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('area_conhecimento_arc')
export class AreaConhecimento extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'arc_id_int' })
  id: number;
  @Column({ name: 'arc_nome_txt', nullable: false, length: 45 })
  arc_nome: string;
  @Column({ name: 'arc_abreviatura_txt', nullable: false, length: 5 })
  arc_abreviatura: string;
  @OneToMany(type => Disciplina, disciplina => disciplina.areaConhecimento, { eager: false })
  disciplinas: Disciplina[];
}