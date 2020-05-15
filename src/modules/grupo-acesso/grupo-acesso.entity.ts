import { MenuAcesso } from './../menu-acesso/menu-acesso.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('grupo_acesso_gac')
export class GrupoAcesso extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'gac_id_int' })
  id: number;
  @Column({ length: 50, nullable: false, name: 'gac_nome_txt' })
  gac_nome: string;
  @Column({ length: 500, name: 'gac_imagem_txt' })
  gac_imagem: string;
  @Column({ length: 50, name: 'gac_texto_txt' })
  gac_texto: string;
  @Column({ length: 45, name: 'gac_modulo_txt' })
  gac_modulo: string;
  /* RELACIONAMENTOS */
  @OneToMany(type => MenuAcesso, menuAcesso => menuAcesso.grupoAcesso, { eager: true })
  menusAcesso: MenuAcesso[];



}