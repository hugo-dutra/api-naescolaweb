import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Escola } from "../escola/escola.entity";

@Entity('nota_nta')
export class Nota {
  @PrimaryGeneratedColumn({ name: 'nta_id_int' })
  id: number;
  @Column({ name: 'nta_media_num', type: 'float4' })
  media: number;
  @Column({ name: 'nta_maximo_num', type: 'float4' })
  maximo: number;
  @Column({ name: 'nta_minimo_num', type: 'float4' })
  minimo: number;
  @Column({ name: 'esc_id_int' })
  esc_id: number;
  @ManyToOne(type => Escola, escola => escola.notas)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola
}