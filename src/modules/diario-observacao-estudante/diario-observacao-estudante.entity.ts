import { DiarioProfessor } from './../diario-professor/diario-professor.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";

@Entity('diario_observacao_estudante_doe')
export class DiarioObservacaoEstudante extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'doe_id_int' })
  id: number;
  @Column({ name: 'doe_observacao_txt', length: 2000, nullable: false })
  doe_observacao: string;
  @Column({ name: 'doe_data_dte', nullable: false })
  doe_data: Date;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Estudante, estudante => estudante.diariosObservacoesEstudantes)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => DiarioProfessor, diarioProfessor => diarioProfessor.diariosObservacoesEstudantes)
  @JoinColumn({ name: 'dip_id_int' })
  diarioProfessor: DiarioProfessor;


}