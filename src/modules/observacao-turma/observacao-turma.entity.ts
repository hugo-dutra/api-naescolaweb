import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "../usuario/usuario.entity";
import { Turma } from "../turma/turma.entity";

@Entity('observacao_turma_obt')
export class ObservacaoTurma extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'obt_id_int' })
  id: number;
  @Column({ name: 'obt_observacao_txt', length: 1000, nullable: false })
  obt_observacao: string;
  @Column({ name: 'obt_data_dte', nullable: false })
  obt_data: Date;
  @ManyToOne(type => Usuario, usuario => usuario.observacoesTurmas, { eager: false })
  @JoinColumn({ name: 'usr_id_int' })
  usuario: Usuario;
  @ManyToOne(type => Turma, turma => turma.observacoesTurmas, { eager: false })
  @JoinColumn({ name: 'trm_id_int' })
  turma: Turma;
}