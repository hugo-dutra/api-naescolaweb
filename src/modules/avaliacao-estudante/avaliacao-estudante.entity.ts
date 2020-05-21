import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { DiarioAvaliacao } from "../diario-avaliacao/diario-avaliacao.entity";
import { Estudante } from "../estudante/estudante.entity";

@Entity('avaliacao_estudante_ave')
export class AvaliacaoEstudante extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'ave_id_int' })
  id: number;
  @Column({ name: 'ave_valor_float' })
  ave_valor: number
  /* RELACIONAMENTOS */
  @ManyToOne(type => DiarioAvaliacao, diarioAvaliacao => diarioAvaliacao.avaliacoesEstudantes)
  @JoinColumn({ name: 'dav_id_int' })
  diarioAvaliacao: DiarioAvaliacao;
  @ManyToOne(type => Estudante, estudante => estudante.avaliacoesEstudantes)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;

}