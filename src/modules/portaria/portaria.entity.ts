import { FrequenciaPortaria } from './../frequencia-portaria/frequencia-portaria.entity';
import { CronogramaPortaria } from './../cronograma-portaria/cronograma-portaria.entity';
import { TurnoPortaria } from './../turno-portaria/turno-portaria.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Escola } from '../escola/escola.entity';

@Entity('portaria_por')
export class Portaria extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'por_id_int' })
  id: number;
  @Column({ name: 'por_codigo_cadastro_txt', length: 45 })
  por_codigo_cadastro: string;
  @Column({ name: 'por_nome_txt', length: 45 })
  por_nome: string;
  @OneToMany(type => TurnoPortaria, turnoPortaria => turnoPortaria.portaria)
  turnosPortaria: TurnoPortaria[];
  @ManyToOne(type => Escola, escola => escola.portarias)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => CronogramaPortaria, cronogramaPortaria => cronogramaPortaria.portaria)
  cronogramasPortaria: CronogramaPortaria[];
  @OneToMany(type => FrequenciaPortaria, frequenciaPortaria => frequenciaPortaria.portaria)
  frequenciasPortarias: FrequenciaPortaria[];

}