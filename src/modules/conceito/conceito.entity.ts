import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Escola } from "../escola/escola.entity";

@Entity('conceito_cct')
export class Conceito {
  /* COLUNAS */
  @PrimaryGeneratedColumn({ name: 'cct_id_int' })
  id: number;
  @Column({ name: 'cct_nome_txt', length: 50 })
  nome: string;
  @Column({ name: 'cct_abreviatura_txt', length: 5 })
  abreviatura: string;
  @Column({ name: 'cct_reprova_bit' })
  reprova: boolean;
  @Column({ name: 'cct_ordem_num', type: "float4", default: 0 })
  ordem: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /*RELACIONAMENTOS*/
  @ManyToOne(type => Escola, escola => escola.conceitos)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
}