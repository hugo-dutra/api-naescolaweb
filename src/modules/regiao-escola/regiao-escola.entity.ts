import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Escola } from "../escola/escola.entity";

@Entity('regiao_escola_ree')
export class RegiaoEscola extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'ree_id_int' })
  id: number;
  @Column({ length: 150, name: 'ree_nome_txt' })
  nome: string;
  @Column({ length: 5, name: 'ree_abreviatura_txt' })
  abreviatura: string;
  @Column({ length: 5, name: 'ree_uf_txt' })
  uf: string;
  /* RELACIONAMENTOS */
  @OneToMany(type => Escola, escola => escola.regiaoEscola)
  escolas: Escola[];

}