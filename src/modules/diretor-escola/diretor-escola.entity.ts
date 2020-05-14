
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Escola } from "../escola/escola.entity";
import { Diretor } from "../diretor/diretor.entity";

@Entity('diretor_escola_dec')
export class DiretorEscola extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'dec_id_int' })
  id: number;
  @Column({ name: 'dir_id_int' })
  dir_id: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Diretor, diretor => diretor.diretoresEscolas, { eager: false })
  @JoinColumn({ name: "dir_id_int" })
  diretor: Diretor;
  @ManyToOne(type => Escola, escola => escola.diretoresEscolas, { eager: false })
  @JoinColumn({ name: "esc_id_int" })
  escola: Escola;

}