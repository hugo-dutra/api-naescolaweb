import { PerfilPermissao } from './../perfil-permissao/perfil-permissao.entity';
import { MenuAcesso } from './../menu-acesso/menu-acesso.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('permissao_acesso_pac')
export class PermissaoAcesso extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'pac_id_int' })
  id: number;
  @Column({ nullable: false, length: 150, name: 'pac_permissao_acesso_txt' })
  pac_permissao_acesso: string;
  @Column({ nullable: false, length: 150, name: 'pac_rota_txt' })
  pac_rota: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => MenuAcesso, menuAcesso => menuAcesso.permissoesAcesso)
  @JoinColumn({ name: 'mac_id_int' })
  menuAcesso: MenuAcesso;
  @OneToMany(type => PerfilPermissao, perfilPermissao => perfilPermissao.permissaoAcesso)
  perfisPermissao: PerfilPermissao[]

}