import { RegistroFrequencia } from './../registro-frequencia/registro-frequencia.entity';
import { DiarioProfessor } from './../diario-professor/diario-professor.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('registro_diario_rdi')
export class RegistroDiario extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'rdi_id_int' })
  id: number;
  @Column({ name: 'rdi_registro_conteudo_txt', length: 1000, nullable: false })
  registro_conteudo: string;
  @Column({ name: 'rdi_data_registro_dte', nullable: false })
  data_registro: Date;
  @Column({ name: 'rdi_data_gravacao_dte', nullable: false })
  data_gravacao: Date;
  @Column({ name: 'dip_id_int', nullable: false })
  dip_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => DiarioProfessor, diarioProfessor => diarioProfessor.registrosDiarios)
  @JoinColumn({ name: 'dip_id_int' })
  diarioProfessor: DiarioProfessor;
  @OneToMany(type => RegistroFrequencia, registroFrequencia => registroFrequencia.registroDiario)
  registrosFrequencias: RegistroFrequencia[]



}