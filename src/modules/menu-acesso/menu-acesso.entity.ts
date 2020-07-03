import { PermissaoAcesso } from './../permissao-acesso/permissao-acesso.entity';
import { GrupoAcesso } from './../grupo-acesso/grupo-acesso.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('menu_acesso_mac')
export class MenuAcesso extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'mac_id_int' })
  id: number;
  @Column({ length: 100, nullable: false, name: 'mac_nome_txt' })
  nome: string;
  @Column({ length: 500, name: 'mac_imagem_txt' })
  imagem: string;
  @Column({ length: 100, name: 'mac_texto_txt' })
  texto: string;
  @Column({ length: 100, name: 'mac_link_txt' })
  link: string;
  @Column({ length: 100, name: 'mac_modulo_txt' })
  modulo: string;
  @Column({ length: 20, name: 'mac_cor_txt' })
  cor: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => GrupoAcesso, grupoAcesso => grupoAcesso.menusAcesso)
  @JoinColumn({ name: 'gac_id_int' })
  grupoAcesso: GrupoAcesso
  @OneToMany(type => PermissaoAcesso, permissaoAcesso => permissaoAcesso.menuAcesso)
  permissoesAcesso: PermissaoAcesso[];

}