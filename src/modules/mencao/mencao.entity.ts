import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Escola } from '../escola/escola.entity';

@Entity('mencao')
export class Mencao {
  /* COLUNAS */
  @PrimaryGeneratedColumn({ name: 'mnc_id_int' })
  id: number;
  @Column({ name: 'mnc_nome_txt', length: 50 })
  nome: string;
  @Column({ name: 'mnc_abreviatura_txt', length: 5 })
  abreviatura: string;
  @Column({ name: 'mnc_reprova_bit' })
  reprova: boolean;
  @Column({ name: 'mnc_ordem_num', type: "float4", default: 0 })
  ordem: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /*RELACIONAMENTOS*/
  @ManyToOne(type => Escola, escola => escola.mencoes)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
}