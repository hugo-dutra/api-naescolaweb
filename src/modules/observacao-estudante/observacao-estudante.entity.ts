import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "../usuario/usuario.entity";
import { Estudante } from "../estudante/estudante.entity";

@Entity('observacao_estudante_obe')
export class ObservacaoEstudante extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'obe_id_int' })
  id: number;
  @Column({ name: 'obe_observacao_txt', length: 2000, nullable: false })
  observacao: string;
  @Column({ name: 'obe_data_hora_dtm', nullable: false })
  data_hora: Date;
  @Column({ name: 'usr_id_int', nullable: false })
  usr_id: number;
  @Column({ name: 'est_id_int', nullable: false })
  est_id: number;
  /* RELACIONAMENTOS */
  @ManyToOne(type => Usuario, usuario => usuario.observacoesEstudantes)
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Estudante, estudante => estudante.observacoesEstudantes)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
}