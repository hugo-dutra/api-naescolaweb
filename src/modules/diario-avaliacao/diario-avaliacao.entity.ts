import { DiarioProfessor } from './../diario-professor/diario-professor.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('diario_avaliacao_dav')
export class DiarioAvaliacao extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'dav_id_int' })
  id: number;
  @Column({ name: 'dav_metodologia_txt', length: 250, nullable: false })
  dav_metodologia: string;
  @Column({ name: 'dav_objetivo_txt', length: 250, nullable: false })
  dav_objetivo: string;
  @Column({ name: 'dav_data_dte', nullable: false })
  dav_data: Date;
  @Column({ name: 'dav_valor_num', nullable: false })
  dav_valor: number;
  @Column({ name: 'dav_peso_num', nullable: false })
  dav_peso: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => DiarioProfessor, diarioProfessor => diarioProfessor.diariosAvaliacoes, { eager: false })
  @JoinColumn({ name: 'diariosAvaliacoes' })
  diarioProfessor: DiarioProfessor;
}