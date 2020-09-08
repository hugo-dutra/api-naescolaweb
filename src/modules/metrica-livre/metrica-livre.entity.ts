import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Escola } from "../escola/escola.entity";

@Entity('metrica_livre_mtl')
export class MetricaLivre {
  /* COLUNAS */
  @PrimaryGeneratedColumn({ name: 'mtl_id_int' })
  id: number;
  @Column({ name: 'mtl_nome_txt', length: 50 })
  nome: string;
  @Column({ name: 'mtl_abreviatura_txt', length: 5 })
  abreviatura: string;
  @Column({ name: 'mtl_reprova_bit' })
  reprova: boolean;
  @Column({ name: 'mtl_ordem_num', type: "float4", default: 0 })
  ordem: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  /*RELACIONAMENTOS*/
  @ManyToOne(type => Escola, escola => escola.metricasLivres)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
}