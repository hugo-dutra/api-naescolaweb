import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";

@Entity('telefone_contato_estudante_tce')
export class TelefoneContatoEstudante extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'tce_id_int' })
  id: number;
  @Column({ length: 25, name: 'tce_telefone_int' })
  telefone: string;
  @Column({ name: 'est_id_int' })
  est_id: number;
  @ManyToOne(type => Estudante, estudante => estudante.telefonesContatoEstudantes)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
}