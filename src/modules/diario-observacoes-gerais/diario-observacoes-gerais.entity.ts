import { DiarioProfessor } from './../diario-professor/diario-professor.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('diario_observacoes_gerais_dog')
export class DiarioObservacoesGerais extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'dog_id_int' })
  id: number;
  @Column({ name: 'dog_observacao_txt', length: 2000, nullable: false })
  dog_observacao: string;
  @Column({ name: 'dog_data_dte', nullable: false })
  dog_data: Date;
  /* RELACIONAMENTOS */
  @ManyToOne(type => DiarioProfessor, diarioProfessor => diarioProfessor.diariosObservacoesGerais, { eager: false })
  @JoinColumn({ name: 'dip_id_int' })
  diarioProfessor: DiarioProfessor;

}