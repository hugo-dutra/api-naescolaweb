import { PerfilPermissao } from './../perfil-permissao/perfil-permissao.entity';
import { UsuarioEscola } from './../usuario-escola/usuario-escola.entity';
import { EscopoPerfilUsuario } from './../escopo-perfil-usuario/escopo-perfil-usuario.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Escola } from '../escola/escola.entity';

@Entity('perfil_usuario_pru')
export class PerfilUsuario extends BaseEntity {
  /* CAMPOS */
  @PrimaryGeneratedColumn({ name: 'pru_id_int' })
  id: number;
  @Column({ length: 45, name: 'pru_perfil_usuario_txt', nullable: false })
  pru_perfil_usuario: string;
  /* RELACIONAMENTOS */
  @ManyToOne(type => EscopoPerfilUsuario, escopoPerfilUsuario => escopoPerfilUsuario.perfilUsuario)
  @JoinColumn({ name: 'epu_id_int' })
  escoposPerfisUsuarios: EscopoPerfilUsuario[];
  @ManyToOne(type => Escola, escola => escola.perfisUsuarios)
  @JoinColumn({ name: 'esc_id_int' })
  escola: Escola;
  @OneToMany(type => UsuarioEscola, usuarioEscola => usuarioEscola.perfilUsuario)
  usuariosEscolas: UsuarioEscola[];
  @OneToMany(type => PerfilPermissao, perfilPermissao => perfilPermissao.perfilUsuario)
  perfisPermissao: PerfilPermissao[];

}