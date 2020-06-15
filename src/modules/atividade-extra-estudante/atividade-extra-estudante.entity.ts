import { AtividadeExtraClasse } from './../atividade-extra-classe/atividade-extra-classe.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estudante } from "../estudante/estudante.entity";

@Entity('atividade_extra_estudante_aee')
export class AtividadeExtraEstudante extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'aee_id_int' })
  id: number;
  @Column({ name: 'aee_firebase_dbkey_txt', length: 50 })
  firebase_dbkey: string;
  @Column({ name: 'aee_status_entrega', default: 0 })
  status_entrega: number;
  @Column({ name: 'est_id_int' })
  est_id: number;
  @Column({ name: 'aec_id_int' })
  aec_id: number;
  /* RELACIONAMENTO */
  @ManyToOne(type => Estudante, estudante => estudante.atividadesExtraEstudante)
  @JoinColumn({ name: 'est_id_int' })
  estudante: Estudante;
  @ManyToOne(type => AtividadeExtraClasse, atividadeExtraClasse => atividadeExtraClasse.atividadesExtraEstudante)
  @JoinColumn({ name: 'aec_id_int' })
  atividadeExtraClasse: AtividadeExtraClasse;

}