import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "../usuario/usuario.entity";
import { Estudante } from "../estudante/estudante.entity";

@Entity('observacao_estudante_obe')
export class ObservacaoEstudante extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'obe_id_int' })
  id: number;
  @Column({ name: 'obe_observacao_txt', length: 2000, nullable: false })
  obe_observacao: string;
  @Column({ name: 'obe_data_hora_dtm', nullable: false })
  obe_data_hora: Date;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Usuario, usuario => usuario.observacoesEstudantes, { eager: false })
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Estudante, estudante => estudante.observacoesEstudantes, { eager: false })
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
}