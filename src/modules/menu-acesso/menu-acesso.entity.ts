import { PermissaoAcesso } from './../permissao-acesso/permissao-acesso.entity';
import { GrupoAcesso } from './../grupo-acesso/grupo-acesso.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('menu_acesso_mac')
export class MenuAcesso extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'mac_id_int' })
  id: number;
  @Column({ length: 100, nullable: false, name: 'mac_nome_txt' })
  mac_nome: string;
  @Column({ length: 500, name: 'mac_imagem_txt' })
  mac_imagem: string;
  @Column({ length: 100, name: 'mac_texto_txt' })
  mac_texto: string;
  @Column({ length: 100, name: 'mac_link_txt' })
  mac_link: string;
  @Column({ length: 100, name: 'mac_modulo_txt' })
  mac_modulo: string;
  @Column({ length: 20, name: 'mac_cor_txt' })
  mac_cor: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => GrupoAcesso, grupoAcesso => grupoAcesso.menusAcesso, { eager: false })
  @JoinColumn({ name: 'gac_id_int' })
  grupoAcesso: GrupoAcesso
  @OneToMany(type => PermissaoAcesso, permissaoAcesso => permissaoAcesso.menuAcesso, { eager: true })
  permissoesAcesso: PermissaoAcesso[];

}