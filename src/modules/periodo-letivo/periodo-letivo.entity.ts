import { ResultadoBoletim } from './../resultado-boletim/resultado-boletim.entity';
import { DiarioAvaliacao } from './../diario-avaliacao/diario-avaliacao.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('periodo_letivo_prl')
export class PeriodoLetivo extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'prl_id_int' })
  id: number;
  @Column({ name: 'prl_periodo_txt', length: 50, nullable: false })
  periodo: string;
  @Column({ name: 'prl_inicio_dte' })
  inicio: Date;
  @Column({ name: 'prl_fim_dte' })
  fim: Date;
  /* RELACIONAMENTOS */
  @OneToMany(type => DiarioAvaliacao, diarioAvaliacao => diarioAvaliacao.periodoLetivo)
  diariosAvaliacoes: DiarioAvaliacao[]
  @OneToMany(type => ResultadoBoletim, resultadoBoletim => resultadoBoletim.periodoLetivo)
  resultadosBoletins: ResultadoBoletim[];


}