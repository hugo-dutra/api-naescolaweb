import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Escola } from '../escola/escola.entity';

@Entity('mensao')
export class Mensao {
  /* COLUNAS */
  @PrimaryGeneratedColumn({ name: 'mns_id_int' })
  id: number;
  @Column({ name: 'mns_nome_txt', length: 50 })
  nome: string;
  @Column({ name: 'mns_abreviatura_txt', length: 5 })
  abreviatura: string;
  @Column({ name: 'mns_reprova_bit' })
  reprova: boolean;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /*RELACIONAMENTOS*/
  @ManyToOne(type => Escola, escola => escola.mensoes)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
}