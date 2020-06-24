import { PerfilUsuario } from './../perfil-usuario/perfil-usuario.entity';
import { PermissaoAcesso } from './../permissao-acesso/permissao-acesso.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";

@Entity('perfil_permissao_pep')
export class PerfilPermissao extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'pep_id_int' })
  id: number;
  @Column({ name: 'pac_id_int' })
  pac_id: number
  @Column({ name: 'pru_id_int' })
  pru_id: number
  /* RELACIONAMENTOS */
  @ManyToOne(type => PermissaoAcesso, permissaoAcesso => permissaoAcesso.perfisPermissao)
  @JoinColumn({ name: 'pac_id_int' })
  permissaoAcesso: PermissaoAcesso;
  @ManyToOne(type => PerfilUsuario, perfilUsuario => perfilUsuario.perfisPermissao)
  @JoinColumn({ name: 'pru_id_int' })
  perfilUsuario: PerfilUsuario;
}