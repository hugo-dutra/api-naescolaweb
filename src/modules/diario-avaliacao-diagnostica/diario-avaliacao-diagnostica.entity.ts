import { DiarioProfessor } from './../diario-professor/diario-professor.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from '../estudante/estudante.entity';

@Entity('diario_avaliacao_diagnostica_dad')
export class DiarioAvaliacaoDiagnostica extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'dad_id_int' })
  id: number;
  @Column({ name: 'dad_avaliacao_txt', length: 2000, nullable: false })
  dad_avaliacao: string;
  @Column({ name: 'dad_data_dte', nullable: false })
  dad_data: Date;
  /* RELACIONAMENTOS */
  @ManyToOne(type => DiarioProfessor, diarioProfessor => diarioProfessor.diariosAvaliacoesDiagnosticas)
  @JoinColumn({ name: 'dip_id_int' })
  diarioProfessor: DiarioProfessor;
  @ManyToOne(type => Estudante, estudante => estudante.diariosAvaliacoesDiagnosticas)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;




}