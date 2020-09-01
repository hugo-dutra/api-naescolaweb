import { Disciplina } from '../disciplina/disciplina.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('tipo_medida_avaliacao_tma')
export class TipoMedidaAvaliacao {
  @PrimaryGeneratedColumn({ name: 'tma_id_int' })
  id: number;
  @Column({ name: 'tma_nome_txt', length: 100 })
  nome: string;
  @OneToMany(type => Disciplina, disciplina => disciplina.tipoMedidaAvaliacao)
  disciplinas: Disciplina[];
}