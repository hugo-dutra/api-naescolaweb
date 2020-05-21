import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Escola } from "../escola/escola.entity";

@Entity('rede_ensino_ren')
export class RedeEnsino extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'ren_id_int' })
  id: number;
  @Column({ length: 100, name: 'ren_nome_txt', nullable: false })
  nome: string;
  @Column({ length: 5, name: 'ren_abreviatura_txt' })
  abreviatura: string
  @Column({ length: 200, name: 'ren_email_txt' })
  email: string;
  @Column({ length: 100, name: 'ren_responsavel_txt' })
  responsavel: string;
  @Column({ length: 200, name: 'ren_endereco_txt' })
  endereco: string;
  @Column({ length: 25, name: 'ren_telefone_txt' })
  telefone: string;
  @Column({ length: 25, name: 'ren_cnpj_txt' })
  cnpj: string;
  @Column({ length: 500, name: 'ren_logo_txt' })
  logo: string;
  /* RELACIONAMENTOS */
  @OneToMany(type => Escola, escola => escola.redeEnsino)
  escolas: Escola[]
}