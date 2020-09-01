import { ResultadoBoletim } from './../resultado-boletim/resultado-boletim.entity';
import { AreaConhecimento } from './../area-conhecimento/area-conhecimento.entity';
import { ProfessorDisciplina } from './../professor-disciplina/professor-disciplina.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { EtapaEnsino } from '../etapa-ensino/etapa-ensino.entity';
import { TipoMedidaAvaliacao } from '../tipo-medida-avaliacao/tipo-medida-avaliacao.entity';

@Entity('disciplina_dsp')
export class Disciplina extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'dsp_id_int' })
  id: number;
  @Column({ name: 'dsp_nome_txt', length: 45, nullable: false })
  nome: string;
  @Column({ name: 'dsp_abreviatura_txt', length: 15, nullable: false })
  abreviatura: string;
  @Column({ name: 'ete_id_int', nullable: false })
  ete_id: number;
  @Column({ name: 'arc_id_int', nullable: false })
  arc_id: number;
  @Column({ name: 'tma_id_int', default: null })
  tma_id: number;
  /* RELACIONAMENTOS */
  @OneToMany(type => ResultadoBoletim, resultadoBoletim => resultadoBoletim.disciplina)
  resultadosBoletins: ResultadoBoletim[];
  @OneToMany(type => ProfessorDisciplina, professorDisciplina => professorDisciplina.disciplina)
  professoresDisciplinas: ProfessorDisciplina;
  @ManyToOne(type => EtapaEnsino, etapaEnsino => etapaEnsino.disciplinas)
  @JoinColumn({ name: 'ete_id_int' })
  etapaEnsino: EtapaEnsino;
  @ManyToOne(type => AreaConhecimento, areaConhecimento => areaConhecimento.disciplinas)
  @JoinColumn({ name: 'arc_id_int' })
  areaConhecimento: AreaConhecimento;
  @ManyToOne(type => TipoMedidaAvaliacao, tipoMedidaAvaliacao => tipoMedidaAvaliacao.disciplinas)
  @JoinColumn({ name: 'tma_id_int' })
  tipoMedidaAvaliacao: TipoMedidaAvaliacao;
}